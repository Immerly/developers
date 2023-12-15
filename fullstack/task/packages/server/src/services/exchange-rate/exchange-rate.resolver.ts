import { ExchangeRate } from '../../entities';
import { CreateExchangeRateInputType, EmptyInput } from './dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateService } from './exchange-rate.service';
import { query } from 'express';

@Resolver(() => ExchangeRate)
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    // TODO: Implement a GraphQL Query that returns the exchange rates
    @Query(() => [ExchangeRate])
    public async getExchangeRatesFromDb() {
        return this.exchangeRateService.provideValidExchangeRates();
    }
}
