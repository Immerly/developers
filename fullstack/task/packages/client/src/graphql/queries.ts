// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_EXCHANGE_RATES = gql`
    query GetExchangeRates {
        exchangeRates {
            rates {
                country
                currency
                amount
                currencyCode
                rate
            }
            lastFetched
        }
    }
`;
