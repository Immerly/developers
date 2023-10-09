import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeRate } from 'src/entities';
import { ExchangeRateRepository } from './exchange-rate.repository';
import { HttpService } from '@nestjs/axios'
import { Observable, from, mergeMap, map, of, exhaustMap, tap, concat } from 'rxjs'
import { EXCHANGE_RATES_URL } from 'src/config/urls';
import { RawExchangeRate } from './exchange-rate.model';

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(ExchangeRate)
        private readonly exchangeRateRepository: ExchangeRateRepository,
        private readonly httpService: HttpService
    ) { }

    public getExchangeRates = (): Observable<ExchangeRate[]> => {
        // TODO: Implement the fetching and parsing of the exchange rates.
        // Use this method in the resolver.

        return from(
            this.exchangeRateRepository.createQueryBuilder('exchange_rate')
                .where(`
                    (extract(epoch from (now() - exchange_rate.updatedAtUtc)) / 60) < 5`
                )
                .getMany()
        )
            .pipe(
                mergeMap(
                    (rates: ExchangeRate[]) => rates.length
                        ? of(rates)
                            .pipe(tap(() => console.log('Cached data...')))
                        : this.fetchExchangeRates()
                            .pipe(  
                                tap(() => console.log('Fetching...')),
                                map(rawRates => rawRates.map(rr => {
                                    const er = new ExchangeRate();
                                    Object.assign(er, rr);
                                    return er;
                                })),
                                mergeMap((rates: ExchangeRate[]) => {
                                    return from(
                                        this.exchangeRateRepository.clear(),
                                    ).pipe(
                                        mergeMap(() => this.exchangeRateRepository.save(rates))
                                    )
                                })
                            )
                )
            )
    };

    private fetchExchangeRates(date = new Date()): Observable<RawExchangeRate[]> {
        if (!(date instanceof Date)) {
            throw new Error('Expecting a date object')
        }

        // E.g. 2023-10-04T12:50:33.181Z.
        const rawStr = date.toISOString();
        const rawDateStr = rawStr.slice(0, rawStr.indexOf('T'));
        const [year, day, month] = rawDateStr.split('-');

        // We need a certain format for the `date` query param.
        const dateParam = `${year}-${month}-${day}`;
        return this.httpService.get(`${EXCHANGE_RATES_URL}?date=${dateParam}`)
            .pipe(
                map((r: any) => r.data.rates)
            );
    }
}
