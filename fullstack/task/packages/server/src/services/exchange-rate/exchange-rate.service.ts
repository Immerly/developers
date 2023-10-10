import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from '../../entities/cache.entity';
import { ExchangeRate } from '../../entities/exchange-rate.entity';
import { InsertExchangeRatesService } from './insert-exchange-rates.service';

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(Cache)
        private readonly cacheRepository: Repository<Cache>,
        private readonly insertExchangeRatesService: InsertExchangeRatesService,
        private readonly logger: Logger
    ) {}

    public getExchangeRates = async () => {
        const currentDate = new Date();

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = currentDate.getFullYear();

        // DD.MM.YYYY
        const formattedDate = `${day}.${month}.${year}`;

        this.logger.log(`${ExchangeRateService.name} called at ${formattedDate}`);

        const [cacheExists] = await this.cacheRepository.find({});

        if (!cacheExists) {
            this.logger.log(
                `${ExchangeRateService.name} - cache not found for date ${formattedDate} - creating a new one`
            );

            const exchangeRates = await this.insertExchangeRatesService.insertExchangeRates(
                formattedDate
            );

            this.logger.log(
                `${ExchangeRateService.name} - retrieved new registers for ${formattedDate}`
            );
            return exchangeRates;
        }

        this.logger.log(`${ExchangeRateService.name} - cache found`);

        const exchangeRates = JSON.parse(cacheExists.value) as ExchangeRate[];

        const [resultDateDay, resultDateMonth, resultDateYear] = cacheExists.key.split('.');
        const resultsDate = new Date(`${resultDateYear}-${resultDateMonth}-${resultDateDay}`);
        return {
            exchangeRates,
            fetchedAt: cacheExists.inserted_at,
            fromDate: resultsDate,
        };
    };
}
