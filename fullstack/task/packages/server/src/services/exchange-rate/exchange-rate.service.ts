import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { ExchangeRate } from '../../entities';

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(ExchangeRate) private exchangeRateRepository: Repository<ExchangeRate>
    ) { }

    public getExchangeRates = async () => {
        const exchangeRates = await this.fetchExchangeRates();
        return exchangeRates;
    };

    private async refreshExchangeRates() {
        // Do stuff
    }

    private async fetchExchangeRates() {
        const res = await fetch('https://api.cnb.cz/cnbapi/exrates/daily?lang=EN').catch((err) => {
            console.error("Couldn't fetch API:", err);
        });
        if (!res || (res && !res.ok)) return [];

        const data = await res.json().catch((err) => {
            console.error("Couldn't parse JSON:", err);
        });

        const RawExchangeRate = z.object({
            validFor: z.string(),
            order: z.number(),
            country: z.string(),
            currency: z.string(),
            amount: z.number(),
            currencyCode: z.string(),
            rate: z.number(),
        });

        const RawRatesResponse = z.object({
            rates: z.array(RawExchangeRate),
        });

        const parsedData = RawRatesResponse.safeParse(data);

        if (!parsedData.success) {
            console.error(parsedData.error);
            return [];
        }

        return parsedData.data.rates;
    }

    private async getCachedRates() {
        // Do stuff
    }
}
