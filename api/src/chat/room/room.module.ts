import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { ChatModule } from '../chat.module';

@Module({
  imports: [PrismaModule],
  providers: [RoomService],
  exports: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}