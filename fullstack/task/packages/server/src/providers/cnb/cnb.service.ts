import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { CNBExchangeRateCurrency } from './cnb-exchange-rate.types';

@Injectable()
export class CNBService {
    private readonly baseUrl =
        'https://www.cnb.cz/en/financial_markets/foreign_exchange_market/exchange_rate_fixing/daily.txt';

    public async getExchangeRates(date: Date): Promise<CNBExchangeRateCurrency[]> {
        const response = await axios.get(`${this.baseUrl}?date=${this.formatDate(date)}`);
        const rows: string[] = response.data.split('\n').slice(2);

        return rows
            .filter((row) => row)
            .map((row) => {
                const [country, currency, amount, code, rate] = row.split('|');
                return {
                    country,
                    currency,
                    amount: parseInt(amount, 10),
                    code,
                    rate: parseFloat(rate),
                };
            });
    }

    private formatDate(date: Date): string {
        return date
            .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
            .replace(/\//g, '.');
    }
}
