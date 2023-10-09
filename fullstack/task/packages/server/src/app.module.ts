import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphqlConfig, typeormConfig } from './config';
import { CronModule } from './services/cron/cron.module';
import { modules } from './entity-modules';
import { ExchangeRateModule } from './services/exchange-rate/exchange-rate.module';
import { MaterializedExchangeRateModule } from './services/materialized-exchange-rate/materialized-exchange-rate.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(typeormConfig),
        GraphQLModule.forRoot(graphqlConfig),
        ScheduleModule.forRoot(),
        ExchangeRateModule,
        MaterializedExchangeRateModule,
        HttpModule,
        CronModule,
        ...modules,
    ],
    controllers: [],
})
export class AppModule {}
