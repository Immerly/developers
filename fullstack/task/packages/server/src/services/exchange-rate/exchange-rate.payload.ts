import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BankRate } from '../../entities/bank-rate.entity';

export interface ExchangeRateItem {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

@ObjectType('ExchangeRate')
export class ExchangeRatePayload implements ExchangeRateItem {
    @Field(() => String, { nullable: false })
    country!: string;

    @Field(() => String, { nullable: false })
    currency!: string;

    @Field(() => Float, { nullable: false })
    amount!: number;

    @Field(() => String, { nullable: false })
    code!: string;

    @Field(() => Float, { nullable: false })
    rate!: number;

    constructor(p?: ExchangeRateItem | BankRate) {
        if (p) {
            this.amount = p.amount;
            this.code = p.code;
            this.currency = p.currency;
            this.rate = p.rate;
            this.country = p.country;
        }
        // eslint-disable-next-line no-constructor-return
        return this;
    }
}
