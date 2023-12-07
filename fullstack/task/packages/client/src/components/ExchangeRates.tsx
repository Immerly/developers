import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EXCHANGE_RATES } from '../queries';
import { ExchangeRatesData } from '../types/ExchangeRates';

const ExchangeRates: React.FC = () => {
    const { loading, error, data } = useQuery<{ exchangeRates: ExchangeRatesData }>(
        GET_EXCHANGE_RATES
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { lastSync } = data?.exchangeRates ?? {};

    return (
        <div className="container my-4">
            <h2 className="text-2xl font-bold mb-2">Exchange Rates</h2>
            <p className="mb-4">Last Sync: {lastSync ? new Date(lastSync).toLocaleString() : ''}</p>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="bg-primary text-white">Country</th>
                            <th className="bg-primary text-white">Currency</th>
                            <th className="bg-primary text-white">Amount</th>
                            <th className="bg-primary text-white">Code</th>
                            <th className="bg-primary text-white">Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.exchangeRates?.data.map((rate) => (
                            <tr key={rate.code}>
                                <td>{rate.country}</td>
                                <td>{rate.currency}</td>
                                <td>{rate.amount}</td>
                                <td>{rate.code}</td>
                                <td>{rate.rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExchangeRates;
