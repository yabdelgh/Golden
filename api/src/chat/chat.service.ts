import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { mySocket } from './chat.gateway';
import { RoomService } from './room/room.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService,
              private roomService: RoomService) { }

  async join(socket: mySocket) {
    const rooms: any = await this.roomService.getRooms(socket.user.id);
    if (rooms.length !== 0)
      for (let i = 0; i < rooms.length; i++) {
        socket.join(String(rooms[i].id));
      }
    return rooms;
  }

}
