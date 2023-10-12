import { CACHE_MANAGER, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { externalConfig } from '../../config';
import { ExchangeRateService as ExchangeRateEntityService } from '../../entity-modules/exchange-rate/exchange-rate.service';
import axios from 'axios';
import { ExchangeRate } from '../../entities';
@Injectable()
export class ExchangeRateService {
    constructor(
        @Inject(ExchangeRateEntityService)
        private readonly exchangeRateEntityService: ExchangeRateEntityService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    public getExchangeRates = async () => {
        // TODO: Implement the fetching and parsing of the exchange rates.
        // Use this method in the resolver.
        let exchangeRates = await this.cacheManager.get<ExchangeRate[]>('exchangeRates');
        if (!exchangeRates || exchangeRates?.length === 0) {
            // console.info('fetched data');
            exchangeRates = await this.fetchExchangeRates();
            await this.exchangeRateEntityService.updateExchangeRates(exchangeRates);
            await this.cacheManager.set('exchangeRates', exchangeRates, 5 * 60 * 1000);
            await this.cacheManager.set('exchangeRatesCachedAt', Date.now());
        } else {
            // console.info('cached data');
        }
        const cachedAt =
            (await this.cacheManager.get<number>('exchangeRatesCachedAt')) ?? Date.now();

        return {
            exchangeRates,
            cachedAt,
        };
    };

    public fetchExchangeRates = async () => {
        try {
            const exchangeRates: ExchangeRate[] = (
                await axios.get(`${externalConfig.cnbEndpoint}?lang=EN`)
            ).data.rates;
            return exchangeRates;
        } catch (e) {
            // console.error('Failed on fetching exchange rates', e);
            throw new ForbiddenException('Exchange rates are not visible now');
        }
    };
}
