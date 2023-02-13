import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  imports: [PrismaModule],
  providers: [GameService],
  exports: [GameService],
  controllers: [GameController],
})
export class GameModule {}
