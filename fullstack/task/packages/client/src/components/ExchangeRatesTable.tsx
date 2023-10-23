import React from 'react';
import { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { EXCHANGE_RATES } from '../api/ExchangeRates'
import Pagination from './Pagination';

export const PAGE_SIZE = 10

const ExchangeRateTable = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
    };

    const { loading, error, data } = useQuery(gql`${EXCHANGE_RATES}`, { variables: { page: currentPage, size: PAGE_SIZE }});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { exchangeRates } = data;
    const { rates, totalPages } = exchangeRates;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Exchange Rates</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b text-center">Country</th>
            <th className="py-2 px-4 border-b text-center">Currency</th>
            <th className="py-2 px-4 border-b text-center">Amount</th>
            <th className="py-2 px-4 border-b text-center">Currency Code</th>
            <th className="py-2 px-4 border-b text-center">Rate</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.currencyCode}>
              <td className="py-2 px-4 border-b text-center">{rate.country}</td>
              <td className="py-2 px-4 border-b text-center">{rate.currency}</td>
              <td className="py-2 px-4 border-b text-center">{rate.amount}</td>
              <td className="py-2 px-4 border-b text-center">{rate.currencyCode}</td>
              <td className="py-2 px-4 border-b text-center">{rate.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination onNext={handleNext} onPrev={handlePrev} currentPage={currentPage} total={totalPages} />
    </div>
  );
};

export default ExchangeRateTable;
