import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
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
 
  @Get('sos')
  async pop(@Res() res) { 
    const id: number = 18;
    const payload = {
      login: 'yabdelgh',
      sub: id,
      email: 'yassine.abdou.1998@gmail.com',
      imageUrl: 'undefined',
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

  @Get('42/callback')
  @UseGuards(Passport42AuthGuard)
  async callback(@Req() req, @Res() res) {
    return this.authService.callback(req.user, res);
  }
  
  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res) {
    return this.authService.logout(res);
  }
}