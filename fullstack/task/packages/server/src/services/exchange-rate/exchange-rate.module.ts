import { Currency } from '../../entities/currency.entity';
import { ExchangeRateMetadata } from '../../entities/exchange-rate-metadata.entity';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { ExchangeRateService } from './exchange-rate.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Currency]),
        TypeOrmModule.forFeature([ExchangeRateMetadata]),
    ],
    providers: [ExchangeRateService, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
