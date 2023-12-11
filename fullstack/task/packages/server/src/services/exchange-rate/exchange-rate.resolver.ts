import { Query, Resolver, Args } from '@nestjs/graphql';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateUserResponse } from './objectType/exchange-rate';
import { IExchangeErrorResponse, IExchangeSuccessResponse, IExchangeInternalServerErrorResponse } from './exchange-rate.interface';

type ServerResponse = {currencyList: IExchangeSuccessResponse[], 
    error?: IExchangeErrorResponse | IExchangeInternalServerErrorResponse }

enum Lang {
    ENG = 'EN',
    CZ = 'CZ'
}

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Query(() => ExchangeRateUserResponse)
    async exchangeRates(@Args('lang', { nullable: true }) lang:Lang = Lang.ENG ): Promise<ExchangeRateUserResponse> {
        const res: ServerResponse = await this.exchangeRateService.getExchangeRates(lang)!

        return res
    }
}
