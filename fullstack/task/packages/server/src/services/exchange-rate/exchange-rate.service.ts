import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '../../entities';
import { CreateExchangeRateInputType } from './dto';
import { ExchangeRateRepository } from './exchangeRate.repository';

/**
 * miliseconds untill the cache must be invalidated
 */
const CACHE_EXPIRY = 5 * 60 * 1000;

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(ExchangeRate)
        private readonly exchangeRateRepository: ExchangeRateRepository,
    ) {}

    public async provideValidExchangeRates(): Promise<ExchangeRate[]> {
        if (await this.isValid()) return await this.exchangeRateRepository.find();
        return await this.fetchAndUpdateExchangeRates();
    }
    public async getLatestRateDate() {
        const item = await this.exchangeRateRepository.findOne({ where: { version: 1 } });
        if (!item) return -1;
        return item.updatedAtUtc.valueOf();
    }
    public async isValid() {
        const now = Date.now();
        return CACHE_EXPIRY > now - (await this.getLatestRateDate());
    }

    public async fetchAndUpdateExchangeRates() {
        // TODO: Implement the fetching and parsing of the exchange rates.
        // Use this method in the resolver.

        const deleteOldData = this.exchangeRateRepository.clear();

        const date = new Date();
        let url = `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/fx-rates-of-other-currencies/fx-rates-of-other-currencies/fx_rates.txt?year=${date.getUTCFullYear}&month=${date.getUTCMonth}`;
        const response = await fetch(url);
        const promises: Promise<ExchangeRate>[] = [];

        await deleteOldData;

        const data = await response.text();
        data.split('\n')
            .slice(2)
            .map((row) => {
                const rowData = row.split('|');
                const obj = {
                    country: rowData[0],
                    currency: rowData[1],
                    amount: rowData[2],
                    code: rowData[3],
                    rate: rowData[4],
                };
                const promise = this.saveExchangeRate(obj);
                promises.push(promise);

                return obj;
            });
        return await Promise.all(promises);
    }
    public saveExchangeRate = async (data: CreateExchangeRateInputType) => {
        const exchangeRate = this.exchangeRateRepository.create({
            ...data,
        });

        return this.exchangeRateRepository.save(exchangeRate);
    };
}
