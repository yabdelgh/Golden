import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MsgModule } from '../msg/msg.module';
import { RoomService } from './room.service';

@Module({
  imports: [PrismaModule, MsgModule],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
