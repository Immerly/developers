import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';;
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import React, { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community';
import { ExchangeRate } from './types'


interface QueryResult {
  data: {
    czechBankExchangeRates: ExchangeRate[]
  };
  loading: boolean;
  error: { message: string; }
}


const EXCHANGE_RATES_QUERY = gql`
  query {
    czechBankExchangeRates {
      amount
      rate
      country
      currency
      currencyCode,
      fetchedMinutesAgo
    }
  }
`;


const ExchangeRateList = (): JSX.Element => {
  const [colDefs] = useState<ColDef<ExchangeRate>[]>([
    { field: 'country', cellStyle: { textAlign: 'start' } },
    { field: 'currency', cellStyle: { textAlign: 'start' } },
    { field: 'currencyCode', cellStyle: { textAlign: 'start' } },
    { field: 'rate', cellStyle: { textAlign: 'start' } },
    { field: 'amount', cellStyle: { textAlign: 'start' } },
    { field: 'amount', cellStyle: { textAlign: 'start' } },
    { field: 'fetchedMinutesAgo', cellStyle: { textAlign: 'start' } },
  ]);

    const response = useQuery<QueryResult>(EXCHANGE_RATES_QUERY, { fetchPolicy: 'no-cache' });
    
    if (response.loading) return "Loading...";
    if (response.error) return <pre>{response.error.message}</pre>

    const rowData = response.data.czechBankExchangeRates;

    // TODO: so far I only have a few numbers of rates
    // in the future if there are many of them, server pagination has to be added

    return (
      <div
        className="ag-theme-quartz-dark"
        style={{ width: '100%', height: '80%' }}
      >
        <AgGridReact 
          columnDefs={colDefs} 
          rowData={rowData} 
          defaultColDef={{ flex: 1 }} 
          gridOptions={{ 
            pagination: true, 
            paginationPageSize: 10
          }} 
        />
      </div>
    );
};

export default ExchangeRateList;
