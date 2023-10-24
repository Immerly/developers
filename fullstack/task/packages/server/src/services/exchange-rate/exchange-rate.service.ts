import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeRate } from '../../entities';

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(ExchangeRate) private exchangeRateRepository: Repository<ExchangeRate>
    ) { }

    public getExchangeRates = async () => {
        return [];
    };

    private async refreshExchangeRates() {
        // Do stuff
    }

    private async fetchExchangeRates() {
        // Do stuff
    }

    private async getCachedRates() {
        // Do stuff
    }
}
