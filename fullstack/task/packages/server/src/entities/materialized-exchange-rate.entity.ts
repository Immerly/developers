import { ViewColumn, ViewEntity } from 'typeorm';
import { EntityWithMeta } from 'src/common/entities/entity-with-meta';

@ViewEntity({
    expression: 'SELECT * FROM exchange_rate',
    materialized: true,
})
export class MaterializedExchangeRate extends EntityWithMeta {
    @ViewColumn({ name: 'country' })
    country!: string;

    @ViewColumn({ name: 'currency' })
    currency!: string;

    @ViewColumn({ name: 'amount' })
    amount!: number;

    @ViewColumn({ name: 'code' })
    code!: string;

    @ViewColumn({ name: 'rate' })
    rate!: number;
}
