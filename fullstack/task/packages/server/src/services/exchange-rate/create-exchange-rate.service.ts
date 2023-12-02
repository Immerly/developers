import { DataSource, EntityManager, IsNull } from 'typeorm';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BankRate } from '../../entities/bank-rate.entity';
import { ExchangeRateItem } from './exchange-rate.payload';
import { GetExchangeRateService, IGetExchangeRateService } from './get-exchange-rate.service';

export interface ICreateExchangeRateService {
    createExchangeRatesBulk: (rates: Array<ExchangeRateItem>) => Promise<Array<BankRate>>;
}

@Injectable()
export class CreateExchangeRateService implements ICreateExchangeRateService {
    private logger: Logger;

    constructor(
        @Inject(GetExchangeRateService)
        private readonly getExchangeRateService: IGetExchangeRateService,
        @InjectDataSource() private readonly dataSource: DataSource
    ) {
        this.logger = new Logger(this.constructor.name);
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    handleCron() {
        this.logger.warn(`=== CRON JOB TRIGGER 'createExchangeRatesBulk' ===`);
        this.getExchangeRateService
            .getActualExchangeRatesFromExternalResource()
            .then((response) => {
                this.createExchangeRatesBulk(response);
            });
    }

    createExchangeRatesBulk = async (rates: Array<ExchangeRateItem>): Promise<Array<BankRate>> => {
        try {
            return this.dataSource.transaction(async (em: EntityManager) => {
                const existedRates = await em.find(BankRate, { where: { deleted_at: IsNull() } });
                const ratesCodeMap = existedRates.length
                    ? existedRates.reduce((acc: Map<string, BankRate>, val: BankRate) => {
                          acc.set(val.code, val);
                          return acc;
                      }, new Map<string, BankRate>())
                    : new Map<string, BankRate>();
                const newRates: Array<BankRate> = [];
                // eslint-disable-next-line no-restricted-syntax
                for (const rate of rates) {
                    const existed = ratesCodeMap.get(rate.code);
                    const data = {
                        currency: rate.currency,
                        country: rate.country,
                        code: rate.code,
                        rate: rate.rate,
                        amount: rate.amount,
                    };
                    if (!existed) {
                        const createdRate = em.create(BankRate, data);
                        newRates.push(createdRate);
                    } else {
                        // eslint-disable-next-line no-await-in-loop
                        await em.update(BankRate, { id: existed.id }, data);
                    }
                }
                const response: Array<BankRate> = [];
                if (newRates.length) {
                    const savedCreatedValues = await em.save(newRates);
                    this.logger.log(`=== NEW RATES WERE SAVED ===`);
                    response.concat(savedCreatedValues);
                }
                return response;
            });
        } catch (e) {
            this.logger.error(`=== 'createExchangeRatesBulk' FAILED ===`, e);
            return [];
        }
    };
}
