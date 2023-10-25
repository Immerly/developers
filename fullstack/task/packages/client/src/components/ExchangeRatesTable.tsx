import { GetExchangeRatesQuery } from '../__generated__/graphql';
import formatDateString from '../common/formatDateString';

interface ExchangeRateTableProps {
    data?: GetExchangeRatesQuery;
}

const ExchangeRatesTable = ({ data }: ExchangeRateTableProps) => {
    if (!data?.exchangeRates) return <div>No data!</div>;

    const lastUpdatedAt = data.exchangeRates[0]
        ? formatDateString(data.exchangeRates[0].createdAtUtc)
        : 'Never';

    return (
        <div className="flex flex-col gap-4 text-white">
            <p className="w-full flex justify-end text-sm text-gray-500 dark:text-gray-300 font-bold upppercase">
                {`Last updated: ${lastUpdatedAt}`}
            </p>
            <div className="overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Currency
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rate
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.exchangeRates?.map((r) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {r.country}
                                </th>
                                <td className="px-6 py-4 uppercase">{r.currency}</td>
                                <td className="px-6 py-4">{r.amount}</td>
                                <td className="px-6 py-4">{r.currencyCode}</td>
                                <td className="px-6 py-4">{r.rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExchangeRatesTable;
