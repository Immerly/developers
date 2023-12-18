import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { ExchangeRateData } from './dto/exchange-rate-data.model';
import { ExchangeRate } from './dto/exchange-rate.model';

@Injectable()
export class ExchangeRateService {
    private readonly CNB_URL = process.env.CNB_EXCHANGE_RATES_URL ?? '';

    private readonly cacheKey = 'exchangeRates';
    private lastFetchTimestamp: Date | null = null;

    constructor(
        private httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    public getExchangeRates = async (): Promise<ExchangeRateData> => {
        const cachedData = await this.cacheManager.get(this.cacheKey);
        if (cachedData) {
            return cachedData as ExchangeRateData;
        }

        try {
            // Fetching exchange rates
            const response = await firstValueFrom(
                this.httpService.get(this.CNB_URL, { responseType: 'text' })
            );

            // Transforming exchange rates
            const rates: ExchangeRate[] = this.parseExchangeRates(response.data);
            this.lastFetchTimestamp = new Date();

            // Updating cache
            this.cacheManager.set(this.cacheKey, {
                rates,
                lastFetchTimestamp: this.lastFetchTimestamp,
            });

            return { rates, lastFetchTimestamp: this.lastFetchTimestamp };
        } catch (error) {
            throw new BadRequestException(error);
        }
    };

    // Parser to parse exchange rate text data from CNB
    private parseExchangeRates(data: string) {
        const lines = data.split('\n');
        const startingLine = 2; // Removing headers

        const exchangeRates = lines.slice(startingLine).map((line) => {
            const [country, currency, amount, code, rate] = line.split('|');
            return { country, currency, amount: Number(amount), code, rate };
        });

        return exchangeRates.filter((rate) => rate.currency); // Filter out empty lines
    }
}
