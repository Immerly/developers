import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { BankRate } from '../../entities/bank-rate.entity';
import { ExchangeRateItem, ExchangeRatePayload } from './exchange-rate.payload';

export enum EBankRateColumnIndex {
    country,
    currency,
    amount,
    code,
    rate,
}

export interface IGetExchangeRateService {
    getExchangeRates: () => Promise<Array<ExchangeRateItem>>;
    getActualExchangeRatesFromExternalResource: () => Promise<Array<ExchangeRateItem>>;
}

@Injectable()
export class GetExchangeRateService implements IGetExchangeRateService {
    private logger: Logger;

    constructor(@InjectRepository(BankRate) private readonly bankRate: Repository<BankRate>) {
        this.logger = new Logger(this.constructor.name);
    }

    public getExchangeRates = async (): Promise<Array<ExchangeRateItem>> => {
        this.logger.log(`=== 'getExchangeRates' was triggered ===`);
        const dbRates = await this.fetchCurrentExchangeRates();
        if (dbRates.length) {
            return dbRates.map((r) => new ExchangeRatePayload(r));
        }
        return this.getActualExchangeRatesFromExternalResource();
    };

    private fetchCurrentExchangeRates = async (): Promise<Array<BankRate>> => {
        try {
            return await this.bankRate.find();
        } catch (e) {
            this.logger.error(`=== 'fetchCurrentExchangeRates' FAILED TO FETCH RATES ===`, e);
            return [];
        }
    };

    getActualExchangeRatesFromExternalResource = async (): Promise<Array<ExchangeRateItem>> => {
        const result: Array<ExchangeRateItem> = [];
        let response: string;
        try {
            const responsePromise = await axios.get(
                // eslint-disable-next-line max-len
                `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt;jsessionid=0AD1D77944C125697FDA9EB992D81365?date=01.12.2023`
            );
            response = responsePromise.data;
        } catch (e) {
            this.logger.error(`=== CANNOT FETCH RATES FROM BANK WEBPAGE ===`, e);
            return [];
        }
        try {
            if (response) {
                if (typeof response === 'string') {
                    const rateResponseStr = <string>response;
                    const rateStrArray: Array<string> = rateResponseStr.split('\n');
                    const [dateString, titles, ...rest] = rateStrArray;
                    this.logger.log(`=== Rate received for: '${dateString}' ===`);
                    this.logger.log(`=== Rate titles: '${titles}' ===`);
                    const ratesMatrix: Array<Array<string>> = rest
                        .filter((r) => !!r)
                        .reduce((acc: Array<Array<string>>, val: string) => {
                            const rateDataArr: Array<string> = val ? val.split('|') : [];
                            if (Array.isArray(rateDataArr) && rateDataArr.length) {
                                acc.push(rateDataArr);
                            }
                            return acc;
                        }, []);
                    // eslint-disable-next-line no-restricted-syntax
                    for (const rateStr of ratesMatrix) {
                        if (rateStr.length && rateStr.length === 5) {
                            let amount = 0;
                            let rate = 0;
                            try {
                                amount = parseFloat(`${rateStr[EBankRateColumnIndex.amount]}`);
                            } catch (e) {
                                this.logger.warn(
                                    `=== CURRENCY: '${
                                        rateStr[EBankRateColumnIndex.currency]
                                    }' AMOUNT IS: '${rateStr[EBankRateColumnIndex.amount]}' ===`
                                );
                            }
                            try {
                                rate = parseFloat(`${rateStr[EBankRateColumnIndex.rate]}`);
                            } catch (e) {
                                this.logger.warn(
                                    `=== CURRENCY: '${
                                        rateStr[EBankRateColumnIndex.currency]
                                    }' RATE IS: '${rateStr[EBankRateColumnIndex.rate]}' ===`
                                );
                            }
                            const parsedRate: ExchangeRateItem = {
                                country: `${rateStr[EBankRateColumnIndex.country]}`,
                                amount,
                                code: `${rateStr[EBankRateColumnIndex.code]}`,
                                currency: `${rateStr[EBankRateColumnIndex.currency]}`,
                                rate,
                                updatedAt: new Date().toUTCString(),
                            };
                            result.push(parsedRate);
                        }
                    }
                    return result;
                }
            }
        } catch (e) {
            this.logger.error(`=== BANK RATE PARSER FAILED ===`, e);
            return result;
        }
        return result;
    };
}
