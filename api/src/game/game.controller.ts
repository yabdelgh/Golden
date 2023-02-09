import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GameService } from './game.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GameDto } from './entities';
@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiOkResponse({ description: 'Get game history', type: [GameDto] })
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
