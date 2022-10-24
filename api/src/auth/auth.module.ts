import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Passport42Strategy } from './strategies/passport42.strategy';

@Module({
  providers: [AuthService, Passport42Strategy],
  controllers: [AuthController]
})
export class AuthModule {}
