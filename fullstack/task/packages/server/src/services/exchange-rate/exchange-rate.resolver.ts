import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { ExchangeRate } from '../../entities';
import { ExchangeRateService } from './exchange-rate.service';

@ObjectType()
export class ExchangeRateResponseDto {
    @Field(() => [ExchangeRate])
    public exchangeRates!: ExchangeRate[];

    @Field(() => Number)
    public cachedAt!: number;
}

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    // TODO: Implement a GraphQL Query that returns the exchange rates
    @Query(() => ExchangeRateResponseDto)
    async exchangeRates(): Promise<ExchangeRateResponseDto> {
        return this.exchangeRateService.getExchangeRates();
    }
}
