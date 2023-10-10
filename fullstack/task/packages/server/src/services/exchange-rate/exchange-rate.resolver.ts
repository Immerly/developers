import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateQueryResponse } from '../../types/exchange-rate-query-response';
import { ExchangeRateService } from './exchange-rate.service';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Query(() => ExchangeRateQueryResponse)
    async exchangeRates(): Promise<ExchangeRateQueryResponse> {
        const { exchangeRates, fetchedAt, fromDate } =
            await this.exchangeRateService.getExchangeRates();

        return {
            exchangeRates,
            fetchedAt,
            fromDate,
        };
    }
}
