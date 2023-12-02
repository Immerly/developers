import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export interface IBankRate {
    id?: number;
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

@Entity('bank_rate')
export class BankRate implements IBankRate {
    @PrimaryGeneratedColumn('rowid', {
        name: 'id',
    })
    id?: number;

    @Column({
        name: 'country',
        type: 'varchar',
        nullable: false,
        length: 50,
    })
    country!: string;

    @Column({
        name: 'currency',
        type: 'varchar',
        nullable: false,
        length: 50,
    })
    currency!: string;

    @Column({
        name: 'amount',
        type: 'float',
        nullable: false,
    })
    amount!: number;

    @Column({
        name: 'code',
        type: 'varchar',
        nullable: false,
        length: 5,
    })
    code!: string;

    @Column({
        name: 'rate',
        type: 'float',
        nullable: false,
    })
    rate!: number;

    @DeleteDateColumn({
        name: 'deleted_at',
    })
    deleted_at?: Date;

    @CreateDateColumn({
        name: 'created_at',
    })
    created_at?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updated_at?: Date;
}
