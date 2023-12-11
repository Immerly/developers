import { graphqlConfig, joiConfig, typeormConfig } from './config';

import { ConfigModule } from '@nestjs/config';
import { ExchangeRateModule } from './services/exchange-rate/exchange-rate.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { modules } from './entity-modules';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ...joiConfig,
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        TypeOrmModule.forRoot(typeormConfig),
        GraphQLModule.forRoot(graphqlConfig),
        ExchangeRateModule,
        ...modules,
    ],
    controllers: [],
})
export class AppModule {}
