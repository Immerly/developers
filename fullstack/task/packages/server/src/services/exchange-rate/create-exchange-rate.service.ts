import { DataSource, EntityManager } from 'typeorm';
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
                await em.delete(BankRate, {});
                const newRates: Array<BankRate> = [];
                // eslint-disable-next-line no-restricted-syntax
                for (const rate of rates) {
                    newRates.push(
                        em.create(BankRate, {
                            currency: rate.currency,
                            country: rate.country,
                            code: rate.code,
                            rate: rate.rate,
                            amount: rate.amount,
                        })
                    );
                }
                return em.save(newRates);
            });
        } catch (e) {
            this.logger.error(`=== 'createExchangeRatesBulk' FAILED ===`, e);
            return [];
        }
    };
}
