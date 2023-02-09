import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { RoomModule } from './room/room.module';
import { MsgModule } from './msg/msg.module';
import { UserModule } from 'src/user/user.module';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [PrismaModule, JwtModule, RoomModule, MsgModule, UserModule, GameModule],
  providers: [ChatService, ChatGateway],
  exports: [ChatGateway]
})
export class ChatModule {}
