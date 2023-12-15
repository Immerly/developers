import { useQuery, gql } from '@apollo/client';

const GET_RATES = gql`
    query {
        getExchangeRatesFromDb {
            id
            country
            amount
            code
            rate
            updatedAtUtc
        }
    }
`;

function App() {
    const { loading, error, data } = useQuery(GET_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const rates = data.getExchangeRatesFromDb;
    const localeDateTimeOfUpdate = rates[0].updatedAtUtc.toLocaleString();

    return (
        <>
            <h1>Title</h1>
            <span>{localeDateTimeOfUpdate}</span>
            <h3></h3>
            <table>
                <thead>
                    {
                        <tr>
                            {Object.keys(rates[0])
                                .slice(2, -1) // exclude the first 2 keys and the last : __typename and id, and updatedAtUtc
                                .map((col) => {
                                    return <th key={col}>{col}</th>;
                                })}
                        </tr>
                    }
                </thead>
                <tbody>
                    {rates.map(
                        ({
                            id,
                            country,
                            amount,
                            code,
                            rate,
                        }: {
                            id: React.Key;
                            country: String;
                            amount: String;
                            code: String;
                            rate: String;
                        }) => (
                            <tr key={id}>
                                <td>{country}</td>
                                <td>{amount}</td>
                                <td>{code}</td>
                                <td>{rate}</td>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>
        </>
    );
}

export default App;
