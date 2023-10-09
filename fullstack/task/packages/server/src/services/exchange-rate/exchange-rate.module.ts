import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate, MaterializedExchangeRate } from 'src/entities';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([ExchangeRate, MaterializedExchangeRate])],
    providers: [ExchangeRateService, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
