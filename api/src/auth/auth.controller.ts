import { Controller, UseGuards, Get } from '@nestjs/common';
import { Passport42AuthGuard } from './guards/passport42.guard';

@Controller('auth')
export class AuthController {
  
  @Get('login')
  @UseGuards(Passport42AuthGuard)
  async login() {}
    
  @Get('42/callback')
  @UseGuards(Passport42AuthGuard)
  async callback() {
      
  }
}
