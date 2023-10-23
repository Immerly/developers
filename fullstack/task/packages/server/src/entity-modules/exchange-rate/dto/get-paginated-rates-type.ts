import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ExchangeRate } from '../../../entities/exchangeRate.entity'

@ObjectType()
export class PaginatedExchangeRates {
  @Field(() => [ExchangeRate])
  rates!: ExchangeRate[];

  @Field(() => Int)
  totalPages!: number;
}
