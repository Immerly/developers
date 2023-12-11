import { Query, Resolver } from '@nestjs/graphql';

import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRatesDto } from './dto';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    // TODO: Implement a GraphQL Query that returns the exchange rates
    @Query(() => ExchangeRatesDto)
    async exchangeRates(): Promise<ExchangeRatesDto> {
        const result = await this.exchangeRateService.getExchangeRates();
        return result;
    }
}
