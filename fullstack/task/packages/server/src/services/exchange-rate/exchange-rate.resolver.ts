import { Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Languages } from '../../shared/types/index';
import { CzechNationalBank } from '../../shared/models/CzechNationalBank.model';
import { ExchangeRate } from '../../graphql/models/ExchangeRate.graphql.model';
import { ExchangeRateService } from './exchange-rate.service';
import { differenceInMinutes } from 'date-fns';

@Resolver(() => ExchangeRate)
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Query(() => [ExchangeRate])
    async czechBankExchangeRates(): Promise<ExchangeRate[]> {
        // TODO: Add an option for users to pass these options if they want to see rates for different days
        const exchangeDate = new Date();
        const lang: Languages = Languages.EN;

        const bank = new CzechNationalBank();

        return this.exchangeRateService.getExchangeRates<CzechNationalBank>(
            lang,
            exchangeDate,
            bank
        );
    }

    @ResolveField()
    fetchedMinutesAgo(@Parent() exchangeRate: ExchangeRate): string {
        const minutes: number = differenceInMinutes(new Date(), exchangeRate.createdAtUtc);
        // During the first fetch from a bank data is returned directly from API, without `createAtUtc` column
        // to prevent query data after it was stored, add this `isNan` check
        return isNaN(minutes) || minutes < 1 ? '< 1 minute ago' : `${minutes} minutes ago`
    }
}
