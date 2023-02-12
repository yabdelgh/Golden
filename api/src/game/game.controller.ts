import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('history/:id')
  @UseGuards(JwtAuthGuard)
  async getHistory(@Param('id') id: number) {
    return this.gameService.getHistory(Number(id));
  }

  @Get('overview/:id')
  @UseGuards(JwtAuthGuard)
  async getOverView(@Param('id') id: number) {
    return this.gameService.getOverview(Number(id));
  }
}
