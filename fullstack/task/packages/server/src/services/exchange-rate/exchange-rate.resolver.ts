import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GetExchangeRateService, IGetExchangeRateService } from './get-exchange-rate.service';
import { ExchangeRatePayload } from './exchange-rate.payload';

@Resolver()
export class ExchangeRateResolver {
    constructor(
        @Inject(GetExchangeRateService)
        private readonly exchangeRateService: IGetExchangeRateService
    ) {}

    @Query(() => [ExchangeRatePayload], { name: 'getExchangeRatesQuery' })
    async exchangeRates(): Promise<Array<ExchangeRatePayload>> {
        const response = await this.exchangeRateService.getExchangeRates();
        return response;
    }
}
