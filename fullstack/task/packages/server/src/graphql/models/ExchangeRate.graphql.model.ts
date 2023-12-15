import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExchangeRate {
    @Field(() => Int)
    amount!: number;

    @Field(() => String)
    currency!: string;

    @Field(() => String)
    country!: string;

    @Field(() => String)
    currencyCode!: string;

    @Field(() => Float)
    rate!: number;
    
    @Field(() => Date)
    createdAtUtc!: Date;

    @Field(() => String)
    fetchedMinutesAgo?: string;
}
