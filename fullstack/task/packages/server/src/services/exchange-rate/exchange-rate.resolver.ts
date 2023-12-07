import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRatesOutput } from './dto/exchange-rate-currency.dto';
import { ExchangeRateService } from './exchange-rate.service';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Query(() => ExchangeRatesOutput)
    public async exchangeRates(): Promise<ExchangeRatesOutput> {
        return this.exchangeRateService.getExchangeRates();
    }
}
