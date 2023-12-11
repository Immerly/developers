import React from 'react'
import IExchangeRateResponse from './exchangeRateResponse.interface'



type Props = {
  data: {
    exchangeRates: {
      currencyList: IExchangeRateResponse[]
    }
  },
  
}
const ExchangeRatesList:React.FC<Props> = ({ data }: Props) => {
  const { exchangeRates: { currencyList } } = data;

  return (
    <table className="w-6/12 float-left mt-12">
      <thead>
        <tr className="text-cyan-500 text-lg">
          <th>Country</th>
          <th>Currency</th>
          <th>Amount</th>
          <th>Currency Code</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {currencyList.map(({ country, currency, amount, currencyCode, rate }) => (
          <tr key={rate+2}>
            <td>{country}</td>
            <td>{currency}</td>
            <td>{amount}</td>
            <td>{currencyCode}</td>
            <td>{rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExchangeRatesList