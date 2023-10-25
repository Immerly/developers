import { gql } from '../__generated__/gql';

export const GET_EXCHANGE_RATES = gql(`
    query GetExchangeRates {
        exchangeRates {
            createdAtUtc
            validFor
            order
            country
            currency
            currencyCode
            rate
        }
    }
`);
