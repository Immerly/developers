import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { EntityWithMeta } from '../common';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity()
export class ExchangeRate extends EntityWithMeta {
    @IsString()
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public validFor!: string;

    @IsString()
    @MinLength(1)
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

    @IsString()
    @MinLength(1)
    @Field(() => Number)
    @Column({ type: 'int' })
    public amount!: number;

    @IsString()
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public currencyCode!: string;

    @IsString()
    @MinLength(1)
    @Field(() => Number)
    @Column({ type: 'float' })
    public rate!: number;
}
