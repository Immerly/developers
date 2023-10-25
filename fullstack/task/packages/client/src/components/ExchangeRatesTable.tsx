import { GetExchangeRatesQuery } from 'src/__generated__/graphql';

interface ExchangeRateTableProps {
    data?: GetExchangeRatesQuery;
}

const ExchangeRatesTable = ({ data }: ExchangeRateTableProps) => {
    return (
        <div>
            {data?.exchangeRates?.map((r) => (
                <div>{r.country}</div>
            ))}
        </div>
    );
};

export default ExchangeRatesTable;
