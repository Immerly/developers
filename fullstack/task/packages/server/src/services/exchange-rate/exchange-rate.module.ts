// src/services/exchange-rate/exchange-rate.module.ts

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { ExchangeRate } from '../../entities/exchange-rate.entity';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([ExchangeRate])
    ],
    providers: [ExchangeRateService, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule { }
