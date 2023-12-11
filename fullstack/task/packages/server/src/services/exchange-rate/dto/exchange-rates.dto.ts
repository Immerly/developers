import { Field, ObjectType } from '@nestjs/graphql';

import { Currency } from '../../../entities/currency.entity';

@ObjectType()
export class ExchangeRatesDto {
    @Field(() => [Currency])
    public currencies!: Currency[];

    @Field(() => Date)
    public lastFetchedDate!: Date;
}
