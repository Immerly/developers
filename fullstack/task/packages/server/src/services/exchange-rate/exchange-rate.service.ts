import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeRateRepository } from './exchange-rate.repository';
import { ExchangeRate } from 'src/entities/exchange-rate.entity';

@Injectable()
export class ExchangeRateService {
    private readonly CNB_URL = process.env.CNB_EXCHANGE_RATES_URL ?? '';

    constructor(
        private httpService: HttpService,
        @InjectRepository(ExchangeRate)
        private exchangeRateRepository: ExchangeRateRepository
    ) {}

    public getExchangeRates = async (): Promise<ExchangeRate[]> => {
        // Check for cached data
        const latestCache = await this.exchangeRateRepository.find();

        // Check if cache is older than 5 minutes
        const fiveMinutes = 300000;
        const currentTime = new Date().getTime();
        if (
            latestCache.length > 0 &&
            currentTime - latestCache[0].lastUpdated.getTime() < fiveMinutes
        ) {
            return latestCache;
        }

        try {
            const updatedCache = await this.fetchAndUpdateRates();

            return updatedCache;
        } catch (error) {
            throw new BadRequestException(error);
        }
    };

    private async fetchAndUpdateRates(): Promise<ExchangeRate[]> {
        // Fetch results from CNB website
        const response = await firstValueFrom(
            this.httpService.get(this.CNB_URL, { responseType: 'text' })
        );

        // Parse rates
        const rates: Omit<ExchangeRate, 'id' | 'lastUpdated'>[] = this.parseExchangeRates(
            response.data
        );
        const dateUpdated = new Date();

        // Save rates to database
        await this.exchangeRateRepository.clear(); // Clear old rates
        const updatedRates = await this.exchangeRateRepository.save(
            rates.map((rate) => ({ ...rate, lastUpdated: dateUpdated }))
        );

        return updatedRates;
    }

    // Parser to parse exchange rate text data from CNB
    private parseExchangeRates(data: string) {
        const lines = data.split('\n');
        const startingLine = 2; // Removing headers

        const exchangeRates = lines.slice(startingLine).map((line) => {
            const [country, currency, amount, code, rate] = line.split('|');
            return { country, currency, amount: Number(amount), code, rate };
        });

        return exchangeRates.filter((rate) => rate.currency); // Filter out empty lines
    }
}
