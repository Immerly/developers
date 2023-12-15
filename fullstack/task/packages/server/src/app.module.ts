import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphqlConfig, typeormConfig } from './config';
import { modules } from './entity-modules';
import { ExchangeRateModule } from './services/exchange-rate/exchange-rate.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(typeormConfig),
        GraphQLModule.forRoot(graphqlConfig),
        ExchangeRateModule,
        ScheduleModule.forRoot(),
        ...modules,
    ],
    controllers: [],
})
export class AppModule {}
