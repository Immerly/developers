import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateService } from './exchange-rate.service';
import { Example } from '../../entities/example.entity';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) { }

    @Query(() => [Example])
    async exchangeRates(): Promise<Example[]> {
        return this.exchangeRateService.getExchangeRates();
    }
}
