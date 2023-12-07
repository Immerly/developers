import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeRate } from '../../entities/exchange-rate.entity';
import { ExchangeRateData } from './exchange-rate.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExchangeRateService {
    private readonly apiUrl: string;
    private readonly cacheDuration: number;

    constructor(
        private httpService: HttpService,
        @InjectRepository(ExchangeRate)
        private exchangeRateRepository: Repository<ExchangeRate>,
        private configService: ConfigService
    ) {
        this.apiUrl = this.configService.get<string>('EXCHANGE_RATE_API_URL')!;

        this.cacheDuration = this.configService.get<number>('CACHE_DURATION')!;

    }

    public async getExchangeRates(): Promise<{ rates: ExchangeRate[], lastFetched: Date }> {
        const latestEntry = await this.getLatestEntry();
        let lastFetchedTime = latestEntry ? new Date(latestEntry.createdAt) : new Date();

        if (this.isCacheStale(latestEntry)) {
            const exchangeRates = await this.fetchExchangeRatesFromAPI();
            await this.updateOrCreateRates(exchangeRates);
            lastFetchedTime = new Date();
        }

        return {
            rates: await this.exchangeRateRepository.find(),
            lastFetched: lastFetchedTime
        };
    }

    private async getLatestEntry(): Promise<ExchangeRate | null> {
        const [latestEntry] = await this.exchangeRateRepository.find({
            order: { createdAt: 'DESC' },
            take: 1
        });
        return latestEntry || null;
    }

    private isCacheStale(latestEntry: ExchangeRate | null): boolean {
        const fiveMinutesAgo = new Date(Date.now() - this.cacheDuration);
        return !latestEntry || new Date(latestEntry.createdAt) < fiveMinutesAgo;
    }

    private async fetchExchangeRatesFromAPI(): Promise<ExchangeRateData[]> {
        const response$ = this.httpService.get(this.apiUrl).pipe(
            map((response: AxiosResponse<any>) => response.data.rates)
        );
        return await lastValueFrom(response$);
    }

    private async updateOrCreateRates(exchangeRates: ExchangeRateData[]): Promise<void> {
        for (const rateData of exchangeRates) {
            let existingRate = await this.exchangeRateRepository.findOne({
                where: { currencyCode: rateData.currencyCode }
            });

            if (existingRate) {
                Object.assign(existingRate, rateData, { createdAt: new Date() });
            } else {
                existingRate = this.exchangeRateRepository.create({ ...rateData, createdAt: new Date() });
            }

            await this.exchangeRateRepository.save(existingRate);
        }
    }
}
