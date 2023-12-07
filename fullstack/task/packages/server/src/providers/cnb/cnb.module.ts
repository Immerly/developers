import { Module } from '@nestjs/common';
import { CNBService } from './cnb.service';

@Module({
    providers: [CNBService],
    exports: [CNBService],
})
export class CNBModule {}
