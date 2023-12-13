import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ExchangeRate, Languages } from '../../shared/types/index';
import { Bank } from '../../shared/models/Bank.model';
import { ExchangeRateRepository } from '../../entities/repositories/exchange-rate/exchange-rate.repository';

interface RatesResponseType {
    rates: ExchangeRate[];
}

@Injectable()
export class ExchangeRateService {
    constructor(
        private readonly httpService: HttpService,
        private readonly exchangeRateRepository: ExchangeRateRepository
    ) {}

    public async getExchangeRates<T extends Bank>(
        lang: Languages,
        date: Date,
        bank: T
    ): Promise<ExchangeRate[]> {
        const dataSourceUrl: string = bank.getDataSourceUrl(lang, date);

        const { entities: ratesFromCache } = await this.exchangeRateRepository.findAll();

        if (ratesFromCache.length) {
            return ratesFromCache;
        }

        const {
            data: { rates },
        } = await firstValueFrom(
            this.httpService.get<RatesResponseType>(dataSourceUrl).pipe(
                catchError((error: AxiosError) => {
                    throw error;
                })
            )
        );

        await this.exchangeRateRepository.bulkInsert(rates);

        return rates;
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async handleDeletion(): Promise<void> {
        return this.exchangeRateRepository.deleteExpiredRates();
    }
}
