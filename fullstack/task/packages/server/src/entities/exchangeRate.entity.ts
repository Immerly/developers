import { EntityWithMeta } from 'src/common';
import { Entity, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class ExchangeRate extends EntityWithMeta {
  @Field(() => String)
  @Column({ type: 'date' })
  public validFor!: Date;

  @Field()
  @Column()
  public order!: number;

  @Field()
  @Column()
  public country!: string;

  @Field()
  @Column()
  public currency!: string;

  @Field()
  @Column('decimal', { precision: 10, scale: 5 })
  public amount!: number;

  @Field()
  @Column()
  public currencyCode!: string;

  @Field()
  @Column('decimal', { precision: 10, scale: 5 })
  public rate!: number;
}
