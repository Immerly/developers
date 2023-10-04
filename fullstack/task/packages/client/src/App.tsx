//components
import { ExchangeRateTable } from "./components/ExchangeRatesTable";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {
    return (
        <Container>
            <Grid
                container
                spacing={0}
                direction="column"
                justifyContent="center"
                sx={{ minHeight: '100vh' }}
            >
                <Grid item>
                    <Typography variant="h4" align="center" mb={3}>Exchange Rates</Typography>
                </Grid>
                <Grid item justifyContent="center">
                    <ExchangeRateTable />
                </Grid>
            </Grid>
        </Container >
    )
}

export default App;
