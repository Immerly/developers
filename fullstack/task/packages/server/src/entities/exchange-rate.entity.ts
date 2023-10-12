import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity({ name: 'ExchangeRate' })
export class ExchangeRate {
    @IsString()
    @MinLength(3)
    @Field(() => String)
    @PrimaryColumn()
    public currencyCode!: string;

    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public country!: string;

    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public currency!: string;

    @IsNumber()
    @Min(0)
    @Field(() => Int)
    @Column({ type: 'int' })
    public amount!: number;

    @IsNumber()
    @Min(0)
    @Field(() => Float)
    @Column({ type: 'float' })
    public rate!: number;

    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public validFor!: string;

    @IsNumber()
    @Min(0)
    @Field(() => Int)
    @Column({ type: 'int' })
    public order!: number;
}
