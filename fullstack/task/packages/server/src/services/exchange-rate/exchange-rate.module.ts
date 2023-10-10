import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cache } from '../../entities/cache.entity';
import { ExchangeRate } from '../../entities/exchange-rate.entity';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { InsertExchangeRatesService } from './insert-exchange-rates.service';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([Cache, ExchangeRate])],
    providers: [
        ExchangeRateService,
        InsertExchangeRatesService,
        ExchangeRateResolver,
        Logger,
        ConfigService,
    ],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
