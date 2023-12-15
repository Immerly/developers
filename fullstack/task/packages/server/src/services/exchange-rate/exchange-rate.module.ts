import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { ExchangeRate } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([ExchangeRate])
    ],
    providers: [
        ExchangeRateService,
        ExchangeRateResolver,
    ],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule { }
