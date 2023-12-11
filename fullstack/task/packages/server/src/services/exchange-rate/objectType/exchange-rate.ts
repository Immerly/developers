import { ObjectType, Field, Float } from '@nestjs/graphql';


@ObjectType()
export class ExchangeRateStructure{
    @Field()
    validFor?: string;

    @Field(() => Number)
    order?: number;

    @Field()
    country?: string;

    @Field()
    currency?: string;

    @Field(() => Float)
    amount?: number;

    @Field()
    currencyCode?: string;

    @Field(() => Float)
    rate?: number;

}

@ObjectType()
export class ExchangeRateUserResponse{
    @Field(() => [ExchangeRateStructure])
    currencyList!: ExchangeRateStructure[];

    @Field()
    cachedMaxTime?: number
}