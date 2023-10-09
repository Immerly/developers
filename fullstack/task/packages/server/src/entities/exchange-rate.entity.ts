import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { EntityWithMeta } from '../common';

@Entity()
export class ExchangeRate extends EntityWithMeta {
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    @Column({ name: 'country', unique: true })
    country!: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @Column({ name: 'currency' })
    currency!: string;

    @IsNumber()
    @Min(1)
    @Max(1000)
    @Column({ name: 'amount' })
    amount!: number;

    @IsString()
    @MinLength(3)
    @MaxLength(3)
    @Column({ name: 'code' })
    code!: string;

    @IsNumber()
    @MinLength(3)
    @MaxLength(3)
    @Column({ name: 'rate', type: 'decimal', precision: 10, scale: 3 })
    rate!: number;
}
