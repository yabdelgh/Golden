import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import Redis from 'ioredis';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        @Inject('REDIS')
        private readonly redis: Redis,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isAuth = await super.canActivate(context);
        if (!isAuth.valueOf()) {
            throw new UnauthorizedException();
        }
        const request = context.switchToHttp().getRequest();
        const token = request?.cookies?.access_token ?? ExtractJwt.fromAuthHeaderAsBearerToken();
        const value = await this.redis.get(token);
        return value !== 'expired';
    }
}