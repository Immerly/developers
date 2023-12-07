import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'exchange_rates' })
export class ExchangeRates {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    public id: number;

    @Column('varchar', { name: 'country', length: 25 })
    public country: string;

    @Column('varchar', { name: 'currency', length: 10 })
    public currency: string;

    @Column('int', { name: 'amount' })
    public amount: number;

    @Column('varchar', { name: 'code', length: 3 })
    public code: string;

    @Column('float', { name: 'rate', precision: 6 })
    public rate: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    @BeforeInsert()
    public insertCreated() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    public insertUpdated() {
        this.updatedAt = new Date();
    }
}
