import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateModule as ExchangeRateEntityModule } from '../../entity-modules/exchange-rate/exchange-rate.module';
import { ExchangeRateResolver } from './exchange-rate.resolver';

@Module({
    imports: [ExchangeRateEntityModule],
    providers: [ExchangeRateService, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
