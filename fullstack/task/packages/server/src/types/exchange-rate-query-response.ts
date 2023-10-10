import { Field, ObjectType } from '@nestjs/graphql';
import { ExchangeRate } from '../entities/exchange-rate.entity';
import { ExchangeRateType } from '../services/exchange-rate/exchange-rate.entity';

@ObjectType()
export class ExchangeRateQueryResponse {
    @Field(() => [ExchangeRateType])
    public exchangeRates!: ExchangeRate[];

    @Field(() => Date)
    public fetchedAt!: Date;

    @Field(() => Date)
    public fromDate!: Date;
}
