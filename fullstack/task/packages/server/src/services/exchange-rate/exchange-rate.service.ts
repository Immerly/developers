import { Injectable } from '@nestjs/common';
import * as NodeCache from 'node-cache';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Example } from '../../entities/example.entity';
@Injectable()
export class ExchangeRateService {
    private cache = new NodeCache();
    private readonly CACHE_KEY = 'exchangeRates';

    constructor(
        @InjectRepository(Example)
        private readonly exchangeRateRepository: Repository<Example>,
    ) { }


    public getExchangeRates = async () => {
        const cachedRates = this.cache.get(this.CACHE_KEY) as Example[];
        if (cachedRates) {
            return cachedRates;
        } else {
            const rates = await this.fetchExchangeRates();
            this.cache.set(this.CACHE_KEY, rates, 300); // Cache for 5 minutes (300 seconds)
            return rates;
        }
    };

    private async fetchExchangeRates() {

        // Fetch exchange rates from the Czech National Bank website
        // Found the api url in the faq section

        const exchangeRatesApiUrl = 'https://www.cnb.cz/en/financial_markets/foreign_exchange_market/exchange_rate_fixing/daily.txt';
        try {
            const response = await fetch(exchangeRatesApiUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status code: ${response.status}`);
            }

            const data = await response.text();
            // Split the data by line and extract the rates
            const lines = data.trim().split('\n');
            const rates: Example[] = [];

            for (let i = 2; i < lines.length; i++) {
                const [, , , code, rate] = lines[i].split('|');
                // Check if a record with the same code already exists in the rates array
                const existingRate = await this.exchangeRateRepository.findOne({ where: { name: code } });
                if (existingRate) {
                    // Update the existing rate's value
                    existingRate.value = rate;
                    existingRate.updatedAtUtc = new Date()
                    rates.push(existingRate);
                    await this.exchangeRateRepository.save(existingRate); // Save the updated rate
                } else {
                    // Create a new rate if it doesn't exist
                    const doc = new Example();
                    doc.name = code;
                    doc.value = rate;
                    rates.push(doc);
                }
            }

            await this.exchangeRateRepository.save(rates);

            return rates;
        } catch (error) {
            console.error('Error fetching exchange rates:', error.message);
            throw error;
        }
    }
}