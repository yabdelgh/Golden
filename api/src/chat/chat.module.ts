import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
//import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { RoomModule } from './room/room.module';
import { MsgModule } from './msg/msg.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, JwtModule, RoomModule, MsgModule, UserModule],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
