import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Passport42AuthGuard } from './guards/passport42.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('login')
  @UseGuards(Passport42AuthGuard)
  async login() { }
  
  @Get('42/callback')
  @UseGuards(Passport42AuthGuard)
  async callback(@Req() req, @Res() res) {
    return this.authService.callback(req.user, res);
  }
}