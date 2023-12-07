import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ExchangeRateType {
    @Field(() => Float)
    amount?: number;

    @Field()
    country?: string;

    @Field()
    currency?: string;

    @Field()
    currencyCode?: string;

    @Field(() => Float)
    rate?: number;

    @Field()
    validFor?: string;
}
