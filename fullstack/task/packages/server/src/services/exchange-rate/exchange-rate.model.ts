import { ExchangeRate } from "../../entities";

export type RawExchangeRate = Pick<
  ExchangeRate,
  'amount' | 'country' | 'currency' | 'currencyCode' | 'order' | 'rate' | 'validFor'
>
