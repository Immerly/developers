import { Query, Resolver } from '@nestjs/graphql';
import { catchError, Observable, of } from 'rxjs';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRate } from 'src/entities';

@Resolver(() => ExchangeRate)
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    // TODO: Implement a GraphQL Query that returns the exchange rates
    @Query(() => [ExchangeRate])
    exchangeRates(): Observable<ExchangeRate[]> {
        return this.exchangeRateService.getExchangeRates()
            .pipe(
                catchError(() => of([]))
            );
    }
}
