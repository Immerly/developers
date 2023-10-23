// exchange-rate.service.ts

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import axios from 'axios';
import { ExchangeRate } from 'src/entities/exchangeRate.entity';
import { PaginatedExchangeRates } from './dto/get-paginated-rates-type';

const CACHE_LIFETIME = 5 * 60 * 1000

@Injectable()
export class ExchangeRateService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(ExchangeRate)
    private exchangeRateRepository: Repository<ExchangeRate>,
  ) {}

  async onApplicationBootstrap() {
    // Schedule a job to clear the cache every 5 minutes and refetch the data
    setInterval(async () => {
      const response = await axios.get(
        'https://api.cnb.cz/cnbapi/exrates/daily?date=2019-05-17&lang=EN',
      );
  
      const exchangeRates = response.data.rates.map((rate: ExchangeRate) => ({
        validFor: new Date(rate.validFor),
        order: rate.order,
        country: rate.country,
        currency: rate.currency,
        amount: rate.amount,
        currencyCode: rate.currencyCode,
        rate: rate.rate,
      }));
  
      // Save fetched rates to the database
      await this.exchangeRateRepository.clear();
      await this.exchangeRateRepository.save(exchangeRates);
    }, CACHE_LIFETIME);
  }

  async getExchangeRates(page: number = 1, itemsPerPage: number = 10): Promise<PaginatedExchangeRates> {
    const offset = (page - 1) * itemsPerPage;
    const rates = await this.exchangeRateRepository.find({
      take: itemsPerPage,
      skip: offset
    });

    const count = await this.exchangeRateRepository.count({})
    const totalPages = Math.ceil(count / itemsPerPage);

    return { rates, totalPages };
  }
}
