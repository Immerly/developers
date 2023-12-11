import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IExchangeSuccessResponse } from './exchange-rate.interface';
import { ExchangeRate } from 'src/entities/exchange-rate.entity';

interface ApiResponse {
    [key:string]: any,
    data: {
        rates: IExchangeSuccessResponse[];
    };
};

@Injectable()
export class ExchangeRateService {
    private cachedTime: number

        constructor(
            private readonly httpApi: HttpService,
            private configService: ConfigService,
            @InjectRepository(ExchangeRate)
            private readonly repository: Repository<ExchangeRate>,
            ){
                this.cachedTime = Number(this.configService.get('CACHED_TIME_IN_MIN')) // 5
            }
    
        public  deleteOutdatedElements = async() => {

            // * optimize deleting ( Index included )

            const outdatedDate = new Date();
            outdatedDate.setMinutes(outdatedDate.getMinutes() - this.cachedTime);
          
             this.repository
              .createQueryBuilder()
              .delete()
              .from(ExchangeRate)
              .where("createdAtUtc < :outdatedDate", { outdatedDate })
              .execute();
          }

        public isCachedTimePassed = async () => {
                try {
                const lastElCreatedAt = (await this.repository.find({order: {createdAtUtc: "DESC"}, take: 1})).at(0)?.createdAtUtc!

                if (!lastElCreatedAt) {
                    return true;
                }
            
                const elCreatedTime = new Date(lastElCreatedAt);
                const currentDate = new Date();
            
                const minutesDiff = (currentDate.getTime() - elCreatedTime.getTime()) / (1000 * 60);
            
                const cachedTimeMinutes = this.cachedTime;
            
                const needToRefresh = minutesDiff >= cachedTimeMinutes;
            
                return needToRefresh;
                } catch (error) {
                console.error('Error checking cached time:', error);
                return true;
                }
            };
            
        
        public getExchangeRates = async (lang:string = 'EN') => {
            try {
                const URL:string = this.configService.get('API_URL_CNB_EXCHANGE_RATE')!;
                const full_url:string = `${URL}?lang=${lang}`;
                
                let res;
                
                if(await this.isCachedTimePassed()) {
                    // * DELETING OUTDATED DATA
                    this.deleteOutdatedElements()

                    const freshData = await this.httpApi.get<ApiResponse>(full_url).toPromise()!

                    res = freshData!.data.rates
                    console.log("FROM API", res.length)
                } else {
                    res = await this.repository.find()
                    console.log("FROM DB", res.length)
                }
                


                await this.repository.save(res);
                
                return { currencyList: res, cachedMaxTime: this.cachedTime};
            } catch (error) {
                console.error('Error in exchangeRates service: ', error);
                return { currencyList: [], error };
            }
        };
}
