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
        sortable: true,
    },
    {
        name: 'Currency',
        selector: (row) => row.currency,
        sortable: true,
    },
    {
        name: 'Amount',
        selector: (row) => row.amount,
        sortable: true,
    },
    {
        name: 'Code',
        selector: (row) => row.code,
        sortable: true,
    },
    {
        name: 'Exchange Rate',
        selector: (row) => formatter.format(row.exchange_rate),
        sortable: true,
    },
];

interface TableProps {
    data: IExchangeRate[];
}

export const Table = ({ data }: TableProps) => {
    return <DataTable columns={columns} data={data} />;
};
