import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { EntityWithMeta } from '../common';

@ObjectType()
@Entity()
export class ExchangeRateMetadata extends EntityWithMeta {
    @Field(() => Date, { nullable: true })
    @Column({ type: 'timestamptz', nullable: true })
    public lastFetchedDate?: Date;
}
