import DataTable, { TableColumn } from 'react-data-table-component';
import { IExchangeRate } from '../../../types/queries/exchange-rate-response';

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const columns: TableColumn<IExchangeRate>[] = [
    {
        name: 'Country',
        selector: (row) => row.country,
        sortable: false,
    },
    {
        name: 'Currency',
        selector: (row) => row.currency,
        sortable: false,
    },
    {
        name: 'Amount',
        selector: (row) => row.amount,
        sortable: false,
    },
    {
        name: 'Code',
        selector: (row) => row.code,
        sortable: false,
    },
    {
        name: 'Exchange Rate',
        selector: (row) => formatter.format(row.exchange_rate),
        sortable: false,
    },
];

interface TableProps {
    data: IExchangeRate[];
}

export const Table = ({ data }: TableProps) => {
    return <DataTable columns={columns} data={data} />;
};
