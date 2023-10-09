import { Example } from './../../entities/example.entity';
import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Example])],
    providers: [ExchangeRateService, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule { }
