import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-yet';
import { graphqlConfig, typeormConfig } from './config';
import { modules } from './entity-modules';
import { ExchangeRateModule } from './services/exchange-rate/exchange-rate.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(typeormConfig),
        GraphQLModule.forRoot(graphqlConfig),
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: async () => ({
                store: await redisStore({
                    socket: {
                        host: 'localhost',
                        port: 6379,
                    },
                }),
            }),
        }),

        ExchangeRateModule,
        ...modules,
    ],
    controllers: [],
})
export class AppModule {}
