import { Query, Resolver } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { MaterializedExchangeRateList } from '../../entities/materialized-exchange-rate-list.entity';
import { ExchangeRateService } from './exchange-rate.service';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Query(() => MaterializedExchangeRateList)
    public async exchangeRates(): Promise<MaterializedExchangeRateList> {
        const items = await this.exchangeRateService.getExchangeRates();

        return plainToInstance(MaterializedExchangeRateList, { items });
    }
}
