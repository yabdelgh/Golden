import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Passport42Strategy } from './strategies/passport42.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.register({})],
  providers: [AuthService, Passport42Strategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
