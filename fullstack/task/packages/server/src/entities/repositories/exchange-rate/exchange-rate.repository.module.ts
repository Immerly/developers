import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateEntity } from '../../exchange-rate.entity';
import { ExchangeRateRepository } from './exchange-rate.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ExchangeRateEntity])],
    providers: [ExchangeRateRepository],
    exports: [ExchangeRateRepository],
})
export class ExchangeRateRepositoryModule {}
