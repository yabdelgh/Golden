import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { authenticator } from 'otplib';
import { UserService } from 'src/user/user.service';
import { toFileStream } from 'qrcode';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
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
      res.redirect(`${this.configService.get<string>('FRONT_HOST')}/Profile`);
    else res.redirect(`${this.configService.get<string>('FRONT_HOST')}/twoFA`);
  }

  async authenticate(userId: number, res: any, code: string) {
    const secret: string = await this.userService.getUserSecret(userId);
    const isValid: boolean = authenticator.verify({ token: code, secret });
    if (!isValid) throw new UnauthorizedException('bad code');
    const payload = { id: userId, authenticated: true };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXP_TIME'),
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    res.cookie('access_token', token, { httpOnly: true });
    res.end();
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

  async logout(res: any) {
    const payload = {
      id: 0,
      authenticated: false,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: 0,
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    res.cookie('access_token', token, { httpOnly: true });
    res.end();
  }
}
