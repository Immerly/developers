import { Args, Query, Resolver } from '@nestjs/graphql';
import { ExchangeRate } from 'src/entities';
import { PaginatedExchangeRates } from './dto/get-paginated-rates-type';
import { ExchangeRateService } from './exchange-rate.service';

@Resolver(() => ExchangeRate)
export class ExchangeRateResolver {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Query(() => PaginatedExchangeRates)
  async exchangeRates(@Args('page') page: number,@Args('size') size: number): Promise<PaginatedExchangeRates> {
    return this.exchangeRateService.getExchangeRates(page, size);
  }
}
