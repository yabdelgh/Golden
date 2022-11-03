import { Injectable } from '@nestjs/common';
import { RoomUserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { mySocket } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async join(socket: mySocket) {
    const rooms = await this.prisma.chatRooms.findMany({
      where: {
        RoomUsers: {
          every: {
            userId: socket.user.id,
            ban: false,
            status: RoomUserStatus.Member,
          },
        },
      },
    });
    if (rooms.length !== 0)
      for (let i = 0; i++; i < rooms.length) socket.join(rooms[i].name);
    return rooms;
  }
}
