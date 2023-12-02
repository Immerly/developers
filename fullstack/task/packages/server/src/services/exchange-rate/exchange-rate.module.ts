import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankRate } from '../../entities/bank-rate.entity';
import { GetExchangeRateService } from './get-exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { CreateExchangeRateService } from './create-exchange-rate.service';

@Module({
    imports: [TypeOrmModule.forFeature([BankRate])],
    providers: [GetExchangeRateService, CreateExchangeRateService, ExchangeRateResolver],
    exports: [GetExchangeRateService],
})
export class ExchangeRateModule {}
