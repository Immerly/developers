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

    public getExchangeRates = async () => {
        // TODO: Implement the fetching and parsing of the exchange rates.
        // Use this method in the resolver.
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
    };
}
