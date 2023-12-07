import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExchangeRatesOutput {
    @Field(() => [ExchangeRateCurrency])
    public data: ExchangeRateCurrency[];

    @Field(() => Date)
    public lastSync: Date;
}

@ObjectType()
export class ExchangeRateCurrency {
    @Field(() => String)
    public country: string;

    @Field(() => String)
    public currency: string;

    @Field(() => Int)
    public amount: number;

    @Field(() => String)
    public code: string;

    @Field(() => Float)
    public rate: number;
}
