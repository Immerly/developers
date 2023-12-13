import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeRateEntity } from '../../exchange-rate.entity';
import { ExchangeRate, WithPagination } from '../../../shared/types';

@Injectable()
export class ExchangeRateRepository {
    constructor(
        @InjectRepository(ExchangeRateEntity)
        private readonly ormRepository: Repository<ExchangeRateEntity>
    ) {}

    private get queryBuilder() {
        return this.ormRepository.createQueryBuilder('currency');
    }

    public async findAll(): Promise<WithPagination<ExchangeRateEntity>> {
        const [rates, count] = await this.queryBuilder.getManyAndCount();

        return { itemsCount: count, entities: rates };
    }

    public async bulkInsert(rates: ExchangeRate[]): Promise<void> {
        this.queryBuilder
            .createQueryBuilder()
            .insert()
            .into(ExchangeRateEntity)
            .values(rates)
            .execute();
    }

    public async deleteExpiredRates(): Promise<void> {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        await this.queryBuilder
            .createQueryBuilder()
            .delete()
            .from(ExchangeRateEntity)
            .where('createdAtUtc <= :fiveMinutesAgo', { fiveMinutesAgo })
            .execute();
    }
}
