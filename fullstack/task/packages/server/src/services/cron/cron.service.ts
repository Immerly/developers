import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';

@Injectable()
export class CronService {
    constructor(private exchangeRateService: ExchangeRateService) {}

    @Cron('*/5 * * * *')
    exchangeRateCron() {
        this.exchangeRateService.refreshExchangeRates();
    }
}
