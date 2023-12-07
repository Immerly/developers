import React from 'react';

const ExchangeRateTable = ({ rates }) => {
    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 w-1/5">
                            Country
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/5">
                            Currency
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/5">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/5">
                            Code
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/5">
                            Rate
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map((rate, index) => (
                        <tr key={index} className="bg-white border-b">
                            <td className="px-6 py-4 w-1/5">{rate.country}</td>
                            <td className="px-6 py-4 w-1/5">{rate.currency}</td>
                            <td className="px-6 py-4 w-1/5">{rate.amount}</td>
                            <td className="px-6 py-4 w-1/5">{rate.currencyCode}</td>
                            <td className="px-6 py-4 w-1/5">{rate.rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExchangeRateTable;
