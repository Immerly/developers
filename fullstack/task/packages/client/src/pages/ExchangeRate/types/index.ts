export interface ExchangeRate {
  amount: number;
  currency: string;
  country: string;
  currencyCode: string;
  rate: number;
  fetchedMinutesAgo: number
}
