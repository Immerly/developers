// src/services/exchange-rate/exchange-rate.resolver.ts

import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRatesResponse } from './exchange-rates-response.type';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) { }

    @Query(() => ExchangeRatesResponse)
    async exchangeRates(): Promise<ExchangeRatesResponse> {
        const result = await this.exchangeRateService.getExchangeRates();
        return {
            rates: result.rates, // Assuming these are already of type ExchangeRateType[]
            lastFetched: result.lastFetched
        };
    }
}
