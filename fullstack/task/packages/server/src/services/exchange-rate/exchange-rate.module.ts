import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateRepositoryModule } from '../../entities/repositories/exchange-rate/exchange-rate.repository.module';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';

@Module({
    imports: [HttpModule, ExchangeRateRepositoryModule],
    providers: [ExchangeRateService, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
