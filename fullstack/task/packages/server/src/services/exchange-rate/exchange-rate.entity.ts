import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ExchangeRateInterface } from '../../types/exchange-rate.interface';

@ObjectType()
export class ExchangeRateType implements ExchangeRateInterface {
    @Field(() => String)
    public id!: string;

    @Field(() => String)
    public country!: string;

    @Field(() => String)
    public currency!: string;

    @Field(() => Int)
    public amount!: number;

    @Field(() => String)
    public code!: string;

    @Field(() => Float)
    public exchange_rate!: number;
}
