export type ExchangeRate = {
    id: string;
    amount: number;
    country: string;
    createdAtUtc: string;
    currency: string;
    currencyCode: string;
    rate: number
}

export const ExchangeRateComponent = ({amount, country, rate, currency, currencyCode}: ExchangeRate) => {
    return (
        <tr>
            <td>{country}</td>
            <td>{currency}</td>
            <td>{amount}</td>
            <td>{currencyCode}</td>
            <td>{rate}</td>
        </tr>
    )
}
