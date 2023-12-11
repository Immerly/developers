import { gql } from '@apollo/client';

export const EXCHANGE_RATES = gql`
  query ExchangeRates($lang: String!) {
    exchangeRates(lang: $lang) {
      currencyList {
        validFor
        order
        country
        currency
        amount
        currencyCode
        rate
      }
      cachedMaxTime
    }
  }
`;
