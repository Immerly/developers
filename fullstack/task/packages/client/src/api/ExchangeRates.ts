export const EXCHANGE_RATES = `
query GetExchangeRates($page: Float!, $size: Float!) {
    exchangeRates(page: $page, size: $size) {
      rates {
        validFor
        amount
        rate
        country
        currency
        currencyCode
      }
      totalPages
    }
  }`; 