import { IExchangeRate } from '../data/exchange-rate';

export interface ExchangeRateDto {
    exchangeRates: {
        cachedAt: number;
        exchangeRates: IExchangeRate[];
    };
}
