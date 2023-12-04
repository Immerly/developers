import './App.css';
import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const getRates = gql`
    query GetExchangeRatesQuery {
        getExchangeRatesQuery {
            code
            country
            rate
            amount
            currency
            updatedAt
        }
    }
`;

const App = () => {
    const { loading, data, network } = useQuery(getRates);
    const [rates, setRates] = useState([]);

    useEffect(() => {
        if (!rates.length && data?.getExchangeRatesQuery) {
            setRates(data.getExchangeRatesQuery);
        }
    }, [data, loading, rates.length, network]);

    return (
        <div className="container">
            <h3> Latest Exchange Rates Czech National Bank: {rates.length} </h3>
            <table>
                <tr>
                    <th>Country</th>
                    <th>Currency</th>
                    <th>Amount</th>
                    <th>Code</th>
                    <th>Rate</th>
                    <th>Update Date</th>
                </tr>
                {rates.length
                    ? rates.map((r) => {
                          return (
                            <tr key={r.code}>
                              <td>{r.country}</td>
                              <td>{r.currency}</td>
                              <td>{r.amount}</td>
                              <td>{r.code}</td>
                              <td>{r.rate}</td>
                              <td>{r.updatedAt}</td>
                          </tr>
                          )
                      })
                    : null}
            </table>
        </div>
    );
};

export default App;
