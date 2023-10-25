import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { ExchangeRate } from '../../entities';

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(ExchangeRate) private exchangeRateRepository: Repository<ExchangeRate>
    ) {}

    public getExchangeRates = async () => {
        const cachedExchangeRates = await this.exchangeRateRepository.find();

        if (cachedExchangeRates.length !== 0) {
            const databaseTime = new Date(cachedExchangeRates[0].createdAtUtc).getTime();
            const timeDifference = new Date().getTime() - databaseTime;
            if (timeDifference <= 5 * 60 * 1000) {
                return cachedExchangeRates;
            }
        }
        const newData = await this.fetchExchangeRates();
        await this.exchangeRateRepository.clear();
        return this.exchangeRateRepository.save(newData);
    };

    private async fetchExchangeRates() {
        const res = await fetch('https://api.cnb.cz/cnbapi/exrates/daily?lang=EN').catch((err) => {
            console.error("Couldn't fetch API:", err);
        });
        if (!res || (res && !res.ok)) return [];

        const data = await res.json().catch((err) => {
            console.error("Couldn't parse JSON:", err);
        });
        const RawExchangeRateSchema = z.object({
            validFor: z.string(),
            order: z.number(),
            country: z.string(),
            currency: z.string(),
            amount: z.number(),
            currencyCode: z.string(),
            rate: z.number(),
        });

        const RawRatesResponseSchema = z.object({
            rates: z.array(RawExchangeRateSchema),
        });

        const parsedData = RawRatesResponseSchema.safeParse(data);

        if (!parsedData.success) {
            console.error(parsedData.error);
            return [];
        }

        return parsedData.data.rates;
    }
}
