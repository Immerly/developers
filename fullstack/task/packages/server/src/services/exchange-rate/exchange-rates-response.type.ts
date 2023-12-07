import { ObjectType, Field } from '@nestjs/graphql';
import { ExchangeRateType } from './exchange-rate.type';

@ObjectType()
export class ExchangeRatesResponse {
    @Field(() => [ExchangeRateType])
    rates?: ExchangeRateType[]; // Marked as optional

    @Field(() => Date)
    lastFetched?: Date; // Marked as optional
}
