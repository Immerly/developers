import { useMemo, useState } from "react";

//Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

//Services
import { useQuery } from '@apollo/client';

//Queries
import { GET_EXCHANGE_RATES } from '../queries/ExchangeRates';

// Types
import { ExchangeRate } from "../types";
import { formatDate } from "../helpers/date";

export const ExchangeRateTable = () => {
    const { loading, error, data } = useQuery(GET_EXCHANGE_RATES);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const headCells = [
        {
            id: 'name',
            label: 'Name',
        },
        {
            id: 'value',
            label: 'Value',
        },
        {
            id: 'updatedAtUtc',
            label: 'Last Updated'
        }
    ];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = useMemo(
        () =>
            data?.exchangeRates.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [data?.exchangeRates, page, rowsPerPage],
    );

    return (
        <>
            {loading ? <CircularProgress /> :
                error ? <p>Error: {error.message}</p> :
                    <>
                        <TableContainer component={Paper}>
                            <Table aria-label="Exchange Rates Table">
                                <TableHead>
                                    <TableRow>
                                        {headCells.map((cell) => <TableCell key={cell.id}>{cell.label}</TableCell>)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {visibleRows.map((rate: ExchangeRate) => (
                                        <TableRow
                                            key={rate.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{rate.name}</TableCell>
                                            <TableCell>{rate.value}</TableCell>
                                            <TableCell>{formatDate(rate.updatedAtUtc)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={data.exchangeRates.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
            }
        </>
    );
}