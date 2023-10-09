import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ExchangeRate } from 'src/entities/exchange-rate.entity';
import { MaterializedExchangeRate } from 'src/entities/materialized-exchange-rate.entity';
import {
    URL,
    exchangeRatesIndexStartAt,
    exchangeRatesObjectKeysLength,
} from '../../config/exchange-rate/index';

export interface Currency {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(ExchangeRate)
        private exchangeRateRepository: Repository<ExchangeRate>,
        @InjectRepository(MaterializedExchangeRate)
        private materializedExchangeRateRepository: Repository<MaterializedExchangeRate>,
        private readonly httpService: HttpService
    ) {}

    public getExchangeRates = async (): Promise<MaterializedExchangeRate[]> => {
        const exchangeRates = await this.materializedExchangeRateRepository.find();
        if (exchangeRates?.length) {
            return exchangeRates;
        }

        await this.refreshExchangeRates();
        return this.materializedExchangeRateRepository.find();
    };

    private parseExchangeRates = (lines: string[]): Currency[] => {
        const currencies: Currency[] = [];
        for (let i = exchangeRatesIndexStartAt; i < lines.length; i++) {
            const line = lines[i].split('|');
            if (line.length !== exchangeRatesObjectKeysLength) {
                // eslint-disable-next-line no-continue
                continue;
            }
            const currency: Currency = {
                country: line[0],
                currency: line[1],
                amount: Number(line[2]),
                code: line[3],
                rate: Number.parseFloat(line[4]),
            };
            currencies.push(currency);
        }

        return currencies;
    };

    private fetchExchangeRates = async (): Promise<Currency[]> => {
        try {
            const lines = (await this.httpService.axiosRef.get(URL)).data.split('\n');
            let currencies: Currency[] = [];
            if (lines?.length) {
                currencies = this.parseExchangeRates(lines);
            }

            return currencies;
        } catch {
            throw new Error('Invalid currency data from CNB');
        }
    };

    public refreshExchangeRates = async (): Promise<void> => {
        const currencies: Currency[] = await this.fetchExchangeRates();
        if (currencies.length) {
            await this.exchangeRateRepository.manager.transaction(
                async (transactionalEntityManager: EntityManager) => {
                    await transactionalEntityManager.query('DELETE FROM exchange_rate');
                    await transactionalEntityManager.insert(ExchangeRate, currencies);
                    await transactionalEntityManager.query(
                        'REFRESH MATERIALIZED VIEW materialized_exchange_rate'
                    );
                }
            );
        }
    };
}
