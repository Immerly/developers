import * as constants from './constants';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { CurrencyBare } from '../../entities/currency.entity';
import { JSDOM } from 'jsdom';
import axios from 'axios';

@Injectable()
export class ExchangeRateService {
    readonly parsingError: HttpException = new HttpException(
        constants.PARSING_ERROR_MESSAGE,
        HttpStatus.INTERNAL_SERVER_ERROR
    );

    constructor(private readonly configService: ConfigService) {}

    private fetchBankPageHTML = async (): Promise<string> => {
        const bankURL = this.configService.get<string>('EXCHANGE_RATE_BANK_URL');
        const response = await axios.get(bankURL!);
        return response.data;
    };

    private parseBankPageHTML = (html: string): CurrencyBare[] => {
        const dom = new JSDOM(html);
        const rows = dom.window.document.querySelectorAll(constants.BANK_PAGE_ENTRY_SELECTOR);

        const currencies: CurrencyBare[] = Array.from(rows).map((row) => {
            if (!this.isBankRowValid(row)) {
                throw this.parsingError;
            }

            const cells = row.querySelectorAll('td');
            return {
                countryName: cells[0].childNodes[0].textContent!.trim(),
                currencyName: cells[1].textContent!.trim(),
                amount: Number(cells[2].textContent!.trim()),
                currencyCode: cells[3].textContent!.trim(),
                rate: Number(cells[4].textContent!.trim()),
            };
        });
        return currencies;
    };

    public getExchangeRates = async () => {
        // TODO: Implement the fetching and parsing of the exchange rates.
        // Use this method in the resolver.

        const html = await this.fetchBankPageHTML();
        const curr = this.parseBankPageHTML(html);

        return [];
    };

    private isBankRowValid = (row: Element): boolean => {
        const cells: Element[] = Array.from(row.querySelectorAll('td'));

        if (cells.length !== 5) {
            return false;
        }
        if (cells.some((cell) => !cell.textContent)) {
            return false;
        }
        if (!cells[0].childNodes?.[0]?.textContent) {
            return false;
        }
        if (Number.isNaN(Number(cells[2].textContent!))) {
            return false;
        }
        if (Number.isNaN(Number(cells[4].textContent!))) {
            return false;
        }

        return true;
    };
}
