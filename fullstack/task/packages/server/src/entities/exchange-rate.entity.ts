import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class ExchangeRate {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    validFor: string;

    @Column()
    order: number;

    @Field()
    @Column()
    country: string;

    @Field()
    @Column()
    currency: string;

    @Field()
    @Column()
    amount: number;

    @Field()
    @Column()
    currencyCode: string;

    @Field()
    @Column('decimal', { precision: 10, scale: 4 })
    rate: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
