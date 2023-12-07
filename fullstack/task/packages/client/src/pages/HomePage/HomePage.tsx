import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EXCHANGE_RATES } from '../../graphql/queries';
import Pagination from '../../components/Pagination/Pagination';
import ExchangeRateTable from '../../components/ExchangeRateTable/ExchangeRateTable';

function HomePage() {
    const { loading, error, data } = useQuery(GET_EXCHANGE_RATES, {
        fetchPolicy: "cache-and-network",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [lastFetched, setLastFetched] = useState<Date | null>(null);

    useEffect(() => {
        if (data && data.exchangeRates) {
            setLastFetched(new Date(data.exchangeRates.lastFetched));
        }
    }, [data]);

    const sortedRates = data && data.exchangeRates ? 
        [...data.exchangeRates.rates].sort((a, b) => a.currencyCode.localeCompare(b.currencyCode)) : [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedRates.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-semibold text-gray-800">Loading...</div>
            </div>
        );
    }

    if (error) {
        console.log(error);
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-semibold text-red-600">Error fetching data :(</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 sm:p-10">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Exchange Rates</h1>
                {lastFetched && (
                    <p className="text-gray-600 text-sm mb-6">Last fetched: {lastFetched.toLocaleTimeString()}</p>
                )}
                <ExchangeRateTable rates={currentItems} />
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={sortedRates.length}
                    paginate={paginate}
                    currentPage={currentPage}
                    className="flex justify-center mt-8 space-x-2"
                />
            </div>
        </div>
    );
}

export default HomePage;
