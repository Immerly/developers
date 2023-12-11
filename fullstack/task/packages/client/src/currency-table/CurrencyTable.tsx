import { gql, useQuery } from '@apollo/client';

const GET_EXCHANGE_RATES_QUERY = gql`
    query {
        exchangeRates {
            lastFetchedDate
            currencies {
                countryName
                currencyName
                currencyCode
                amount
                rate
            }
        }
    }
`;

const CurrencyTable = () => {
    const { loading, error, data } = useQuery(GET_EXCHANGE_RATES_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const { lastFetchedDate, currencies } = data.exchangeRates;

    const minutesAgo = parseInt((Date.now() - new Date(lastFetchedDate).valueOf()) / 1000 / 60);
    const tableRows = currencies.map((currencyData) => (
        <tr key={currencyData.currencyCode}>
            <td>{currencyData.countryName}</td>
            <td>{currencyData.currencyName}</td>
            <td>{currencyData.amount}</td>
            <td>{currencyData.currencyCode}</td>
            <td>{currencyData.rate}</td>
        </tr>
    ));

    return (
        <div className="table-wrapper">
            <span>Fetched {minutesAgo} minutes ago</span>
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Code</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
        </div>
    );
};

export default CurrencyTable;
