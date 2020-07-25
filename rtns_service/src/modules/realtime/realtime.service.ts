import { Injectable } from '@nestjs/common';
import { EnvironmentService } from '../../environment.variables';
import * as NRP from 'node-redis-pubsub';
import { RealtimeObservable } from './realtime.observer';

@Injectable()
export class RealTimeService {
    environment = new EnvironmentService('.env');
    nrp: any;
    config: any = {
        url: this.environment.get('REDIS_URL'),
    };

    servers: any;

    constructor(private readonly observer: RealtimeObservable ) {
        this.nrp = new NRP(this.config);
        /* This variable is handling the server and callback function when a new message
         from redis server has arrived */
        this.servers = [
            {
                type: 'comlink',
                function: 'newComlinkMessage',
            },
            {
                type: 'etd',
                function: 'newEtdMessage',
            },
        ];
    }

    /* This function is subscribing to redis pub/sub messages fora specific message event */
    subscribeToRedisMessage(message: string) {
        this.nrp.on(message, async(data, channel) => {
            this.servers.forEach(server => {
                if (channel.includes(server.type)) {
                    this.observer[server.function](data, channel);//this code select the appropiate function observer handler 
                }
            });
        });
    }
}