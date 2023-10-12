import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeRate } from '../../entities';

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(ExchangeRate)
        private readonly exchangeRateRepository: Repository<ExchangeRate>
    ) {}

    public getExchangeRates = async () => {
        return this.exchangeRateRepository.find();
    };

    public updateExchangeRates = async (exchangeRates: ExchangeRate[]) => {
        await this.exchangeRateRepository.clear();
        return this.exchangeRateRepository.save(exchangeRates);
    };
}
