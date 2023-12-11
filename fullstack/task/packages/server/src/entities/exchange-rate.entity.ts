import { IsString, MinLength } from 'class-validator';
import { Entity, Column, Index } from 'typeorm';
import { EntityWithMeta } from '../common';
import { VAR_CHAR } from './constants';

/*
validFor: string;
  order: number;
  country: string;
  currency: string;
  amount: number;
  currencyCode: string;
  rate: number;
*/

@Entity()
@Index('index_createdAtUtc', ['createdAtUtc'])
export class ExchangeRate extends EntityWithMeta {
  @IsString()
  @MinLength(1)
  @Column({ ...VAR_CHAR })
  public validFor!: string;

  @Column({ type: 'float' }) 
  public order!: number;

  @IsString()
  @MinLength(1)
  @Column({ ...VAR_CHAR })
  public country!: string;

  @IsString()
  @MinLength(1)
  @Column({ ...VAR_CHAR })
  public currency!: string;

  @Column({ type: 'float' }) 
  public amount!: number;

  @IsString()
  @MinLength(1)
  @Column({ ...VAR_CHAR })
  public currencyCode!: string;

  @Column({ type: 'float' })
  public rate!: number;
}
