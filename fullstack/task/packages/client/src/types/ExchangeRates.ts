export interface ExchangeRate {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

export interface ExchangeRatesData {
    lastSync: string;
    data: ExchangeRate[];
}
