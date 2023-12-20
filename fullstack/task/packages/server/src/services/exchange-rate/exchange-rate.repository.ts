import { Repository } from 'typeorm';
import { ExchangeRate } from '../../entities/exchange-rate.entity';

export class ExchangeRateRepository extends Repository<ExchangeRate> {}
