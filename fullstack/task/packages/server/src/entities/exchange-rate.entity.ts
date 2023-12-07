// src/entities/exchange-rate.entity.ts

import { Entity, Unique, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
@Unique(["currencyCode"])
export class ExchangeRate {
    @PrimaryGeneratedColumn()
    id!: number; // Using "!" to tell TypeScript that these will be initialized by TypeORM

    @Column({ type: 'float' })
    amount!: number;

    @Column()
    country!: string;

    @Column()
    currency!: string;

    @Column()
    currencyCode!: string;

    @Column({ type: 'float' })
    rate!: number;

    @Column()
    validFor!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
}
