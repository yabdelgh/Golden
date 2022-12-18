import { Injectable } from '@nestjs/common';
import { RoomUser } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { mySocket } from './chat.gateway';
import { RoomService } from './room/room.service';

@Injectable()
export class ChatService {
  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private prisma: PrismaService) { }

  async join(socket: mySocket) {
    const rooms: any = await this.roomService.getRooms(socket.user.id);
      for (let i = 0; i < rooms.length; i++) {
        const ret = rooms[i].RoomUsers.find((ele: RoomUser) =>  ele.userId === socket.user.id );
        if (!ret.ban)
          socket.join(String(rooms[i].id));
      }
    return rooms;
  }
  
  async getDMRooms(socket: mySocket) {
    const rooms: any = await this.roomService.getDMRooms(socket.user.id);
      for (let i = 0; i < rooms.length; i++) {
        socket.join(String(rooms[i].id));
      }
    return rooms;

  }
  
  async getUsers(userId: number, connectedUsers: UserDto[]) { 
    const users: UserDto[] = await this.userService.getUsers(userId);
    users.forEach((ele1: UserDto) => { 
      const connectedUser = connectedUsers.find((ele2) => ele2.id === ele1.id);
      if (connectedUser !== undefined)
        ele1.isOnline = connectedUser.isOnline;
      else
        ele1.isOnline = false;
      return ele1;
    });
    return users;
  }

  async getFriends(userId: number) {
    return this.prisma.friend.findMany({
      where: {
        OR: [
        { user2Id: userId },
        {user1Id: userId}
        ]
      },
      select: {
        user1Id: true,
        user2Id: true,
        status: true
      }
    });
  }
}
