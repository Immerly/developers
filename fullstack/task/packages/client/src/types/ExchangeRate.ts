export type ExchangeRate = {
   validFor: Date;
   order: number;
   country: string;
   currency: string;
   amount: number;
   currencyCode: string;
   rate: number;
}