import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { authenticator } from 'otplib';
import { UserService } from 'src/user/user.service';
import { toFileStream } from 'qrcode';
import { Redis } from 'ioredis';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @Inject('REDIS')
    private readonly redis: Redis,
  ) {}

  async callback(user: any, res: any) {
    const payload = {
      id: user.id,
      authenticated: !user.isTwoFactorAuthenticationEnabled,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXP_TIME'),
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    res.cookie('access_token', token, { httpOnly: true });
    if (payload.authenticated)
      res.redirect(`${this.configService.get<String>('FRONT_HOST')}/Profile`);
    else res.redirect(`${this.configService.get<String>('FRONT_HOST')}/twoFA`);
  }

  async authenticate(userId: number, res: any, code: string) {
    const secret: string = await this.userService.getUserSecret(userId);
     const isValid : boolean = authenticator.verify({ token: code, secret });
    if (!isValid) throw new UnauthorizedException('bad code');
    const payload = { id: userId, authenticated: true };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXP_TIME'),
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    res.cookie('access_token', token, { httpOnly: true });
    res.end()
  }

  async generate(userId: number, res: any) {
    const secret = authenticator.generateSecret();
    const user = await this.userService.updateUser(userId, {
      twoFactorAuthenticationCode: secret,
    });
    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'),
      secret,
    );
    return toFileStream(res, otpauthUrl);
  }

  async update2FA(userId: number, token: string, value: boolean) {
    const secret: string = await this.userService.getUserSecret(userId);
    const isValid: boolean = authenticator.verify({ token, secret });
    if (isValid)
      return this.userService.updateUser(userId, {
        isTwoFactorAuthenticationEnabled: value,
      });
    else throw new UnauthorizedException('Wrong authentication code');
  }
  
  async logout(req: any) {
    const token = req?.cookies?.access_token ?? ExtractJwt.fromAuthHeaderAsBearerToken();
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
    const expiresIn = payload.exp - payload.iat;
    await this.redis.set(token, 'expired', 'EX', expiresIn);
    await this.redis.expire(token, expiresIn);
    return { message: 'logout' };
  }
}
