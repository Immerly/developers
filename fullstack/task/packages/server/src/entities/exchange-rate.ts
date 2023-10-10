import { Column, PrimaryColumn } from 'typeorm';
import { VAR_CHAR } from './constants';

export abstract class ExchangeRate {
    @PrimaryColumn('uuid')
    public id!: string;

    @Column({ ...VAR_CHAR })
    public country!: string;

    @Column({ ...VAR_CHAR })
    public currency!: string;

    @Column({ type: 'int8' })
    public amount!: number;

    @Column({ type: 'varchar', length: 4 })
    public code!: string;

    @Column({ type: 'float4' })
    public exchange_rate!: number;
}
