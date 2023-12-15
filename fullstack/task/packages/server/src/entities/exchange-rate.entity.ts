import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityWithMeta } from '../common';

@Entity('exchange_rate')
export class ExchangeRateEntity extends EntityWithMeta {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ type: 'decimal', precision: 100, scale: 2 })
    amount!: number;

    @Column({ length: 20 })
    currency!: string;

    @Column({ length: 50 })
    country!: string;

    @Column({ length: 10, name: 'currency_code' })
    currencyCode!: string;

    @Column({ type: 'decimal', precision: 100, scale: 6 })
    rate!: number;
}
