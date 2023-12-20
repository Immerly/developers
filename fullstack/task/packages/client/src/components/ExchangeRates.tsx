import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import './exchangeRates.css';

const GET_EXCHANGE_RATES = gql`
    query {
        exchangeRates {
            lastUpdated
            code
            country
            rate
            amount
            currency
        }
    }
`;

type ExchangeRate = {
    lastUpdated: string;
    country: string;
    code: string;
    currency: string;
    amount: number;
    rate: string;
};

interface ExchangeRateQueryData {
    exchangeRates: ExchangeRate[];
}

const ExchangeRates = () => {
    const { loading, error, data } = useQuery<ExchangeRateQueryData>(GET_EXCHANGE_RATES);

    if (loading) return <h3 className="exchange-rate-loading">Loading...</h3>;
    if (error) return <p>Error : {error.message}</p>;

    let time;
    if (data?.exchangeRates) {
        time = new Date(data.exchangeRates[0].lastUpdated).toLocaleTimeString();
    }

    return (
        <div>
            <div className="exchange-rates-heading">
                <h2>Exchange Rates</h2>
                <h2>Last fetched at {time}</h2>
            </div>
            <table id="exchange-rates-table">
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Code</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.exchangeRates.map((rate: ExchangeRate) => (
                        <tr key={rate.country}>
                            <td>{rate.country}</td>
                            <td>{rate.code}</td>
                            <td>{rate.currency}</td>
                            <td>{rate.amount}</td>
                            <td>{rate.rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExchangeRates;
