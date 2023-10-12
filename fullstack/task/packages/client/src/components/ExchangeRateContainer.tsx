import { useQuery, gql } from '@apollo/client';
import { ExchangeRateDto } from '../dto/exchange-rate.dto';

const GET_EXCHANGE_RATES = gql`
    query MyQuery {
        exchangeRates {
            cachedAt
            exchangeRates {
                country
                currency
                amount
                currencyCode
                rate
            }
        }
    }
`;

export const ExchangeRateContainer = () => {
    const {
        loading,
        error,
        data: exchangeRatesResponse,
    } = useQuery<ExchangeRateDto>(GET_EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error {error.message}</p>;

    return (
        <div>
            {exchangeRatesResponse ? (
                <div>
                    <div className="flex justify-between">
                        <div className="">
                            <h1 className="text-xl font-semibold leading-6 text-gray-900">
                                Exchange Rates
                            </h1>
                            <p className="mt-2 text-gray-700">
                                <b className="mr-1">
                                    {Math.ceil(
                                        (Date.now() -
                                            exchangeRatesResponse?.exchangeRates.cachedAt) /
                                            (60 * 1000)
                                    )}
                                </b>
                                mins ago
                            </p>
                        </div>
                        <div className="mt-4">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-xs sm:text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                TODO: Report
                            </button>
                        </div>
                    </div>

                    <table className="min-w-full mt-8 divide-y divide-gray-300 ring-1 ring-gray-300 rounded-md sm:rounded-lg">
                        <thead>
                            <tr>
                                <th className="p-3 text-left text-xs sm:text-base font-semibold text-gray-900">
                                    Country
                                </th>
                                <th className="p-3 text-center text-xs sm:text-base font-semibold text-gray-900 hidden sm:block">
                                    Currency
                                </th>
                                <th className="p-3 text-center text-xs sm:text-base font-semibold text-gray-900">
                                    Code
                                </th>
                                <th className="p-3 text-right text-xs sm:text-base font-semibold text-gray-900">
                                    Amount
                                </th>
                                <th className="p-3 text-right text-xs sm:text-base font-semibold text-gray-900">
                                    Rate
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {exchangeRatesResponse.exchangeRates.exchangeRates.map(
                                (rate, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap p-3 text-xs sm:text-base text-gray-500">
                                            {rate.country}
                                        </td>
                                        <td className="whitespace-nowrap p-3 text-xs sm:text-base text-center text-gray-500 hidden sm:block">
                                            {rate.currency}
                                        </td>

                                        <td className="whitespace-nowrap p-3 text-xs sm:text-base text-center text-gray-500">
                                            {rate.currencyCode}
                                        </td>
                                        <td className="whitespace-nowrap p-3 text-xs sm:text-base text-right text-gray-500">
                                            {rate.amount}
                                        </td>
                                        <td className="whitespace-nowrap p-3 text-xs sm:text-base text-right text-gray-500">
                                            {rate.rate}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No data</p>
            )}
        </div>
    );
};
