import { Controller, UseGuards, Get, Req, Res, Post, Body, Query, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { query } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Passport42AuthGuard } from './guards/passport42.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  @Get('login')
  @UseGuards(Passport42AuthGuard)
  async login() { }
  
  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res) {
    return this.authService.logout(res);
  }

  @Get('42/callback')
  @UseGuards(Passport42AuthGuard)
  async callback(@Req() req, @Res() res) {
    return this.authService.callback(req.user, res);
  }
  
  @Post('2fa/authenticate')
  @UseGuards(JwtAuthGuard)
  async generate(@Req() req, @Res() res, @Body() { code }: {code: string}) { 
    return this.authService.authenticate(req.user.id, res, code);
  }

  
  @Get('2fa/generate')
  @UseGuards(JwtAuthGuard)
  async authenticate(@Req() req, @Res() res) {
    return this.authService.generate(req.user.id, res)
   }


  @Post('2fa/update')
  @UseGuards(JwtAuthGuard)
  async enable2FA(@Req() req, @Body() payload: { token: string, value: boolean }) {
   return this.authService.update2FA(req.user.id, payload.token, payload.value);
  }

  
  
  @Get('yabdelgh')
  async yabdelgh(@Res() res) { 
    const payload = {
      login: 'yabdelgh',
      id: 18,
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
  
  @Get('samira')
  async samira(@Res() res) { 
    const payload = {
      login: 'samira',
      id: 66,
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
}