import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { EntityWithMeta } from '../common';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity()
export class ExchangeRate extends EntityWithMeta {
    @IsString()
    @Field(() => String)
    @Column({ type: 'varchar', length: 10 })
    public validFor!: string;

    @IsNumber()
    @Field(() => Number)
    @Column({ type: 'int' })
    public order!: number;

    @IsString()
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public country!: string;

    @IsString()
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public currency!: string;

    @IsNumber()
    @Field(() => Number)
    @Column({ type: 'int' })
    public amount!: number;

    @IsString()
    @Field(() => String)
    @Column({ type: 'varchar', length: 3 })
    public currencyCode!: string;

    @IsNumber()
    @Field(() => Number)
    @Column({ type: 'float' })
    public rate!: number;
}
