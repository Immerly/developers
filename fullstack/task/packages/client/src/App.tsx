import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Layout } from "./styles/Layout";
import ExchangeRateList from "./components/ExchangeRate";
import { getSecondsAndMinutes } from "./helpers/exchange-rate";

const EXCHANGE_RATES_QUERY = gql`
query {
  exchangeRates {
    items {
      country
      currency
      amount
      rate
      code
      createdAtUtc
    }
  }
}
`;

const App: React.FC = () => {
  const { data, loading, error } = useQuery(EXCHANGE_RATES_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong, please try again later...</div>;
  }

  if (!data?.exchangeRates?.items?.length) {
    return <div>There are no currencies to display...</div>;
  }

const {minutes, seconds} = getSecondsAndMinutes(data.exchangeRates.items[0].createdAtUtc)

  return (
    <Layout>
      <h1>Currencies were fetched {minutes} minutes and {seconds} seconds ago</h1>
      <ExchangeRateList currencies={data.exchangeRates.items} />
    </Layout>
  );
};

export default App;
