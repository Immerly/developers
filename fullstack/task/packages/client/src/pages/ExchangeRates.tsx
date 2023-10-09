import { gql, TypedDocumentNode, useQuery } from '@apollo/client'
import { LastFetched } from '../components/ExchangeRate/LastFetched';
import { Table } from '../components/Table';
import './ExchangeRates.css'

// TODO: should have shared common types between packages.
interface ExchangeRate {
  country: string;
  currency: string;
  amount: number;
  currencyCode: string;
  rate: number;
  id: string;
}

interface Data {
  exchangeRates: ExchangeRate[];
}

const GET_EXCHANGE_RATES: TypedDocumentNode<Data> = gql`
{
    exchangeRates {
        id,
        country,
        currency,
        amount,
        currencyCode,
        rate
    }
}
`;

const OMITTED_COLUMNS = new Set(['__typename', 'id']);

function ExchangeRates() {
  const { loading, error, data } = useQuery(GET_EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! error.message`</p>;

  const { exchangeRates } = data!;
  console.log(exchangeRates);

  if (!exchangeRates?.length) {
    return <p>No exchange rates</p>
  }

  // TODO: if needed, could use `useMemo`.
  const columns = Object.keys(exchangeRates[0]).filter(c => !OMITTED_COLUMNS.has(c));

  return (
    <div className='exchange-rates-container'>
      <LastFetched />
      <Table<ExchangeRate>
        columns={columns}
        data={exchangeRates}
        onRenderCell={(rateObject, col: keyof ExchangeRate) => {
          // Could return something more complex here, e.g. select, datepicker, etc.
          return <span>{rateObject[col]}</span>;
        }}
      />
    </div>
  )
}

export default ExchangeRates
