import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExchangeRate {
    @Field()
    country!: string;

    @Field()
    code!: string;

    @Field()
    currency!: string;

    @Field()
    amount!: number;

    @Field()
    rate!: string;
}
