import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterializedExchangeRate } from 'src/entities';

@Module({
    imports: [TypeOrmModule.forFeature([MaterializedExchangeRate])],
    providers: [],
    exports: [],
})
export class MaterializedExchangeRateModule {}
