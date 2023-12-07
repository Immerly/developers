export interface ExchangeRateApiResponse {
    rates: ExchangeRateData[];
}

export interface ExchangeRateData {
    validFor: string;
    order: number;
    country: string;
    currency: string;
    amount: number;
    currencyCode: string;
    rate: number;
}