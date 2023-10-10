import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { v4 } from 'uuid';

import { ExchangeRate } from '../../entities/exchange-rate.entity';
import { ConfigService } from '@nestjs/config';
import { ExchangeRateQueryResponse } from '../../types/exchange-rate-query-response';
import { Cache } from '../../entities/cache.entity';

@Injectable()
export class InsertExchangeRatesService {
    constructor(
        @InjectRepository(ExchangeRate)
        private readonly exchangeRateRepository: Repository<ExchangeRate>,
        @InjectRepository(Cache)
        private readonly cacheRepository: Repository<Cache>,
        private readonly configService: ConfigService,
        private readonly logger: Logger
    ) {}

    async insertExchangeRates(formattedDate: string): Promise<ExchangeRateQueryResponse> {
        this.logger.log(`${InsertExchangeRatesService.name} called at ${new Date().toISOString()}`);

        const websiteUrl = this.configService.get<string>('CZECH_NATIONAL_BANK_EXCHANGE_URL');

        if (!websiteUrl) {
            throw new Error('CZECH_NATIONAL_BANK_EXCHANGE_URL is required and it is not defined');
        }

        const { data: rawExchangeData } = await axios.get(`${websiteUrl}?=${formattedDate}`);

        const rows = rawExchangeData.trim().split('\n');
        const headers = rows[0];

        const [dateOfResultsFormatted] = headers.split(' ');

        const exchangeRates = rows.slice(2).map((row: string) => {
            const cells = row.split('|').map((cell) => cell.trim());

            const [country, currency, amount, code, exchange_rate] = cells;
            return {
                id: v4(),
                country,
                currency,
                amount: Number(amount),
                code,
                exchange_rate: Number(exchange_rate.replace(',', '')),
            };
        });

        const [day, month, year] = dateOfResultsFormatted.split('.');
        const fromDate = new Date(`${year}-${month}-${day}`);

        if (!exchangeRates.length) {
            return {
                fetchedAt: new Date(),
                exchangeRates: [],
                fromDate,
            };
        }

        await this.exchangeRateRepository.delete({});

        await this.exchangeRateRepository
            .createQueryBuilder()
            .insert()
            .into(ExchangeRate)
            .values(exchangeRates)
            .execute();

        const date = new Date();
        await this.cacheRepository.delete({ key: formattedDate });
        await this.cacheRepository.save({
            key: formattedDate,
            value: JSON.stringify(exchangeRates),
            inserted_at: date.toISOString(),
        });

        return {
            fetchedAt: date,
            exchangeRates,
            fromDate,
        };
    }
}
