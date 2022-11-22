import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async callback(user: any, res: any) {
    const payload = {
      login: user.login,
      id: user.id,
      email: user.email,
      imageUrl: user.imageUrl,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    res.cookie('access_token', token, {
      httpOnly: true,
    });
    res.redirect('http://localhost:3000/chat');
  }

  async logout(res: any) { 
    const payload = {
      login: null,
      id: null,
      email: null,
      imageUrl: null,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: -100,
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    res.cookie('access_token', token, { httpOnly: true });
    res.end();
  }
}
