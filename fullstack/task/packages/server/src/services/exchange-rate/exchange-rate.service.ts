import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ExchangeRate} from '../../entities';
import {ExchangeRateRepository} from "./exchange-rate.repository";

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(ExchangeRate)
        private readonly exchangeRateRepository: ExchangeRateRepository
    ) {
    }

    private getRatesFromApi = async () => {
        const response = await fetch('https://api.cnb.cz/cnbapi/exrates/daily?date=2019-05-17&lang=EN');
        const data = await response.json();

        return data.rates.map((rate: any) => {
            const exchangeRate = new ExchangeRate();
            exchangeRate.validFor = new Date(rate.validFor);
            exchangeRate.order = rate.order;
            exchangeRate.country = rate.country;
            exchangeRate.currency = rate.currency;
            exchangeRate.amount = rate.amount;
            exchangeRate.currencyCode = rate.currencyCode;
            exchangeRate.rate = rate.rate;
            return exchangeRate;
        });
    }

    private async cacheIsValid(): Promise<boolean> {
        const latestEntry = await this.exchangeRateRepository.find({
            order: { createdAtUtc: 'DESC' },
            take: 1
        });
        if (!latestEntry) return false;

        const age = new Date().getTime() - latestEntry[0].createdAtUtc.getTime();
        return age < 5 * 60 * 1000;
    }

    private async saveRates(rates: ExchangeRate[]) {
        await this.exchangeRateRepository.delete({});
        return await this.exchangeRateRepository.save(rates);
    }

    public getExchangeRates = async () => {
        if (await this.cacheIsValid()) {
            return this.exchangeRateRepository.find();
        } else {
            const rates = await this.getRatesFromApi();
            return await this.saveRates(rates);
        }
    };
}
