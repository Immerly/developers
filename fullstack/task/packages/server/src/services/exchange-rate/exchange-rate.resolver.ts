import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRate } from './dto/exchange-rate.model';
import { ExchangeRateData } from './dto/exchange-rate-data.model';

@Resolver(() => ExchangeRate)
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    // TODO: Implement a GraphQL Query that returns the exchange rates
    @Query(() => ExchangeRateData)
    async exchangeRates(): Promise<ExchangeRateData> {
        return this.exchangeRateService.getExchangeRates();
    }
}
