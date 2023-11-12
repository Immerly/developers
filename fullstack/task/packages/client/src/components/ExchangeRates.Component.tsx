import {GET_EXCHANGE_RATES} from "../query/exchange-rates";
import {useQuery} from "@apollo/client";
import {useState, useEffect} from "react"
import {ExchangeRate, ExchangeRateComponent} from "./ExchangeRate.Component";
import {TimePassedTimer} from "./Timer.Component";

type ExchangeRatesData = {
    exchangeRates: ExchangeRate[];
};

export const ExchangeRatesComponent = () => {
    const {data, loading, error} = useQuery<ExchangeRatesData>(GET_EXCHANGE_RATES);
    const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

    console.log(data);
    useEffect(() => {
        if (data && !loading) {
            setExchangeRates(data.exchangeRates);
        }

    }, [data]);


    if (loading) return <h1>Loading...</h1>;
    if (error) return <p>Error loading exchange rates!</p>;

    return (
        <>
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
            <tbody>
            {
                exchangeRates.map((elem: ExchangeRate) => (
                    <ExchangeRateComponent key={elem.id} {...elem} />
                ))
            }
            </tbody>
        </table>
            {exchangeRates.length > 0 && (
                <TimePassedTimer createdAtUtc={exchangeRates[0].createdAtUtc}/>
            )}
        </>
    )
}
