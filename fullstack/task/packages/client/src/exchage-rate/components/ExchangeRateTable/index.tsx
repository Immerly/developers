import React, { useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableSortLabel,
} from '@mui/material';
import {ExchangeRate} from 'src/exchage-rate/types';

interface ExchangeRateTableProps {
    rates: ExchangeRate[];
}

const ExchangeRateTable: React.FC<ExchangeRateTableProps> = ({ rates }) => {
    const [sortBy, setSortBy] = useState<keyof ExchangeRate>('country');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortChange = (property: keyof ExchangeRate) => {
        const isAsc = sortBy === property && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortBy(property);
    };

    const sortedRates = [...rates].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue === bValue) {
            return 0;
        }

        if (sortOrder === 'asc') {
            return aValue < bValue ? -1 : 1;
        }
        return aValue > bValue ? -1 : 1;
    });

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <SortableTableCell
                            property="country"
                            label="Country"
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortChange={handleSortChange}
                        />
                        <SortableTableCell
                            property="currency"
                            label="Currency"
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortChange={handleSortChange}
                        />
                        <SortableTableCell
                            property="amount"
                            label="Amount"
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortChange={handleSortChange}
                        />
                        <SortableTableCell
                            property="currencyCode"
                            label="Code"
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortChange={handleSortChange}
                        />
                        <SortableTableCell
                            property="rate"
                            label="Rate"
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortChange={handleSortChange}
                        />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRates.map((rate, index) => (
                        <TableRow key={index}>
                            <TableCell>{rate.country}</TableCell>
                            <TableCell>{rate.currency}</TableCell>
                            <TableCell>{rate.amount}</TableCell>
                            <TableCell>{rate.currencyCode}</TableCell>
                            <TableCell>{rate.rate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

interface SortableTableCellProps {
    property: keyof ExchangeRate;
    label: string;
    sortBy: keyof ExchangeRate;
    sortOrder: 'asc' | 'desc';
    onSortChange: (property: keyof ExchangeRate) => void;
}

const SortableTableCell: React.FC<SortableTableCellProps> = ({
    property,
    label,
    sortBy,
    sortOrder,
    onSortChange,
}) => {
    const isSelected = property === sortBy;

    return (
        <TableCell>
            <TableSortLabel
                active={isSelected}
                direction={isSelected ? sortOrder : 'asc'}
                onClick={() => onSortChange(property)}
            >
                {label}
            </TableSortLabel>
        </TableCell>
    );
};

export default ExchangeRateTable;
