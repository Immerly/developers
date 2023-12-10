import { Column, Entity } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsString, Length, MinLength } from 'class-validator';

import { EntityWithMeta } from '../common';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity()
export class Currency extends EntityWithMeta {
    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public countryName!: string;

    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public currencyName!: string;

    @IsString()
    @Length(3)
    @Field(() => String)
    @Column({ ...VAR_CHAR, unique: true })
    public currencyCode!: string;

    @IsNumber()
    @IsPositive()
    @Field(() => Int)
    @Column({ type: 'int' })
    public amount!: number;

    @IsNumber()
    @IsPositive()
    @Field(() => Number)
    @Column({ type: 'decimal' })
    public rate!: number;
}
