import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JSDOM } from 'jsdom';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency, CurrencyBare } from '../../entities/currency.entity';
import { ExchangeRateMetadata } from '../../entities/exchange-rate-metadata.entity';
import * as constants from './constants';
import { ExchangeRatesDto } from './dto';

@Injectable()
export class ExchangeRateService {
    readonly parsingError: HttpException = new HttpException(
        constants.PARSING_ERROR_MESSAGE,
        HttpStatus.INTERNAL_SERVER_ERROR
    );

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Currency)
        private currencyRepository: Repository<Currency>,
        @InjectRepository(ExchangeRateMetadata)
        private metadataRepository: Repository<ExchangeRateMetadata>
    ) {}

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

    private isCurrencyDataUpToDate = (metadata: ExchangeRateMetadata | undefined): boolean => {
        if (!metadata?.lastFetchedDate) {
            return false;
        }
        const lifetime = this.configService.get<number>('EXCHANGE_RATE_LIFETIME_MS');
        return Date.now() - new Date(metadata?.lastFetchedDate).getTime() < lifetime!;
    };

    private updateLastFetchedMetadata = async (newDate: Date): Promise<void> => {
        const metadataArray = await this.metadataRepository.find();
        const metadata = metadataArray?.[0];
        await this.metadataRepository.upsert(
            [
                {
                    ...metadata,
                    lastFetchedDate: newDate,
                },
            ],
            ['id']
        );
    };

    public getExchangeRates = async (): Promise<ExchangeRatesDto> => {
        const metadata = (await this.metadataRepository.find())?.[0];
        let lastFetchedDate = metadata?.lastFetchedDate;

        if (!this.isCurrencyDataUpToDate(metadata)) {
            lastFetchedDate = new Date();
            const html = await this.fetchBankPageHTML();
            const pageCurrencies = this.parseBankPageHTML(html);

            await this.currencyRepository.upsert(pageCurrencies, ['currencyCode']);
            await this.updateLastFetchedMetadata(lastFetchedDate);
        }

        const dbCurrencies = await this.currencyRepository.find();

        return {
            currencies: dbCurrencies,
            lastFetchedDate: lastFetchedDate!,
        };
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
        if (Number.isNaN(Number(cells[2].textContent))) {
            return false;
        }
        if (Number.isNaN(Number(cells[4].textContent))) {
            return false;
        }

        return true;
    };
}
