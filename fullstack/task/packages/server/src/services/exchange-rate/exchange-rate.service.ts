import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { ExchangeRates } from '../../entities/exchange-rates.entity';
import { CNBService } from '../../providers/cnb/cnb.service';
import { ExchangeRatesOutput } from './dto/exchange-rate-currency.dto';

@Injectable()
export class ExchangeRateService {
    public constructor(
        private readonly cnbService: CNBService,
        @InjectRepository(ExchangeRates)
        private exchangeRatesRepository: Repository<ExchangeRates>
    ) {}

    public async getExchangeRates(): Promise<ExchangeRatesOutput> {
        const rates = await this.exchangeRatesRepository.find({ order: { country: 'ASC' } });
        if (rates.length) {
            return {
                lastSync: rates[0].createdAt,
                data: rates,
            };
        }

        const syncDate = new Date();
        const cnbRates = await this.cnbService.getExchangeRates(syncDate);
        const exchangeRates = cnbRates.map((rate) => this.exchangeRatesRepository.create(rate));
        await this.exchangeRatesRepository.save(exchangeRates);

        return {
            lastSync: syncDate,
            data: exchangeRates,
        };
    }

    @Cron('* * * * *')
    private handleCron() {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        return this.exchangeRatesRepository.delete({
            createdAt: LessThan(fiveMinutesAgo),
        });
    }
}
