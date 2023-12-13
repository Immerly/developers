import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { ExchangeRate } from 'src/entities/exchange-rate.entity';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ExchangeRateService {
    private readonly logger = new Logger(ExchangeRateService.name);

    constructor(
        @InjectRepository(ExchangeRate)
        private readonly exchangeRateRepository: Repository<ExchangeRate>,
        private readonly httpService: HttpService
    ) {}

    public getExchangeRates = async () => {
        const cachedRates = await this.exchangeRateRepository.find({
            where: {
                createdAt: MoreThan(new Date(Date.now() - 5 * 60 * 1000)),
            },
        });

        if (cachedRates.length > 0) {
            this.logger.log('Getting exchange rates from the cache');
            return cachedRates;
        }

        this.logger.log('Receiving exchange rates from the bank');
        const freshRates = await this.fetchExchangeRates();
        await this.cacheExchangeRates(freshRates);

        return freshRates;
    };

    private async fetchExchangeRates() {
        try {
            const response = await this.httpService
                .get('https://api.cnb.cz/cnbapi/exrates/daily?lang=EN')
                .toPromise();
            return response?.data?.rates;
        } catch (error) {
            this.logger.error('Error fetching exchange rates:', error);
            throw new ForbiddenException('Czech National Bank API not available');
        }
    }

    private async cacheExchangeRates(rates: ExchangeRate[]) {
        await this.exchangeRateRepository.clear();
        await this.exchangeRateRepository.save(rates);
        this.logger.log('Exchange rates successfully saved in the cache');
    }

    @Cron('*/5 * * * *') // Run every 5 minutes
    private async invalidateCache() {
        this.logger.log('Invalidating cache');
        await this.exchangeRateRepository.clear();
    }
}
