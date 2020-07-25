import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RealtimeController } from './realtime.controller';
import { RealTimeService } from './realtime.service';
import { RealtimeObservable } from './realtime.observer';
//import { HandleMessage } from './handle.Message';
@Module({
    imports: [],
    controllers: [RealtimeController/*, HandleMessage*/],
    providers: [RealTimeService, RealtimeObservable],
    exports: []

})

export class RealtimeModule {
}