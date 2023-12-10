import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExchangeRateService {
    constructor(private readonly configService: ConfigService) {}

    public fetchBankPageHTML = async (): Promise<string> => {
        const bankURL = this.configService.get<string>('EXCHANGE_RATE_BANK_URL');
        const response = await axios.get(bankURL!);
        return response.data;
    };

    public getExchangeRates = async () => {
        // TODO: Implement the fetching and parsing of the exchange rates.
        // Use this method in the resolver.

        return [];
    };
}
