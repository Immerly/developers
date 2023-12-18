import { Field, ObjectType } from '@nestjs/graphql';
import { ExchangeRate } from './exchange-rate.model';

@ObjectType()
export class ExchangeRateData {
    @Field(() => [ExchangeRate])
    rates!: ExchangeRate[];

    @Field({ nullable: true })
    lastFetchTimestamp?: Date;
}
