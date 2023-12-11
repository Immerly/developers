interface IExchangeRateResponse {
  validFor: string;
  order: number;
  country: string;
  currency: string;
  amount: number;
  currencyCode: string;
  rate: number;
}

export default IExchangeRateResponse