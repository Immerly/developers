export interface IExchangeRate {
    id: string;
    country: string;
    currency: string;
    amount: number;
    code: string;
    exchange_rate: number;
}

export interface IExchangeRateQueryResponse {
    exchangeRates: IExchangeRate[];
    fetchedAt: Date;
}
