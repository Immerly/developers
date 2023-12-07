import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CNBModule } from '../../providers/cnb/cnb.module';
import { ExchangeRates } from '../../entities/exchange-rates.entity';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([ExchangeRates]), CNBModule],
    providers: [ExchangeRateService, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
