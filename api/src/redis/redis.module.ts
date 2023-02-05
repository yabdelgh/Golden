import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

const RedisProvider = {
    provide: 'REDIS',
    useFactory: (config: ConfigService) => {
        return new Redis({
            host: config.get('REDIS_HOST'),
            port: config.get('REDIS_PORT')
        });
    },
    inject: [ConfigService],
};

@Global()
@Module({
    providers: [RedisProvider],
    exports: [RedisProvider],
})
export class RedisModule {}
