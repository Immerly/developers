import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate } from 'src/entities';
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [
        TypeOrmModule.forFeature([ExchangeRate]),
        HttpModule,
    ],
    providers: [ExchangeRateService, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
