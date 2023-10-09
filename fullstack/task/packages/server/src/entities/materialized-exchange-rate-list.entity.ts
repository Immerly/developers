import { Field, ObjectType } from '@nestjs/graphql';
import { MaterializedExchangeRate } from './materialized-exchange-rate.object';

@ObjectType()
class MaterializedExchangeRateList {
    @Field(() => [MaterializedExchangeRate])
    public items!: MaterializedExchangeRate[];
}

export { MaterializedExchangeRateList };
