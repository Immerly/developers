import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity()
export class ExchangeRate {
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({ ...VAR_CHAR })
    country!: string;

    @Field(() => String)
    @Column({ ...VAR_CHAR })
    code!: string;

    @Field(() => String)
    @Column({ ...VAR_CHAR })
    currency!: string;

    @Field(() => Number)
    @Column()
    amount!: number;

    @Field(() => String)
    @Column({ ...VAR_CHAR })
    rate!: string;

    @Field(() => Date)
    @CreateDateColumn({ type: 'timestamp' })
    lastUpdated!: Date; // Timestamp of when the data was fetched
}
