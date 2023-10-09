import { Field, ObjectType } from '@nestjs/graphql';
import { EntityWithMeta } from '../common';

@ObjectType()
export class MaterializedExchangeRate extends EntityWithMeta {
    @Field(() => String)
    public country!: string;

    @Field(() => String)
    public currency!: string;

    @Field(() => Number)
    public amount!: number;

    @Field(() => String)
    public code!: string;

    @Field(() => Number)
    public rate!: number;
}
