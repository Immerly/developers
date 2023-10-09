import { Module } from '@nestjs/common';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { CronService } from './cron.service';

@Module({
    imports: [ExchangeRateModule],
    providers: [CronService],
})
export class CronModule {}
