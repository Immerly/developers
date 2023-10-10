import { gql } from '@apollo/client';

export const EXCHANGE_RATES = gql`
    query getExchangeRates {
        exchangeRates {
            exchangeRates {
                id
                country
                currency
                amount
                code
                exchange_rate
            }
            fetchedAt
            fromDate
        }
    }
`;
