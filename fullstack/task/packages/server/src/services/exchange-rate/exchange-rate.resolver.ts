import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRate } from '../../entities';
import { ExchangeRateService } from './exchange-rate.service';

@Resolver(() => ExchangeRate)
export class ExchangeRateResolver {
    constructor(private readonly propertyService: ExchangeRateService) { }

    @Query(() => [ExchangeRate], { nullable: true })
    public async exchangeRates() {
        return this.propertyService.getExchangeRates();
    }
}
