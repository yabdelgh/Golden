import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { mySocket } from './chat.gateway';
import { RoomService } from './room/room.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private roomService: RoomService,
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getUserFromsocket(socket: mySocket): Promise<number> {
    let token = String(socket.handshake.headers.cookie);
    token = token.replace('access_token=', '');
    const user = await this.jwtService.verify(token, {
      secret: this.config.get('JWT_SECRET'),
    });
    user.isOnline = true;
    user.inGame = false;
    socket.in(String(user.id)).disconnectSockets();
    socket.join(String(user.id));
    socket.user = user;
    return user.id;
  }

  async getRooms(socket: mySocket) {
    const rooms: any = await this.roomService.getRooms(socket.user.id);
    for (let i = 0; i < rooms.length; i++) socket.join(`room${rooms[i].id}`);
    return rooms;
  }

  async getDMRooms(socket: mySocket) {
    const rooms: any = await this.roomService.getDMRooms(socket.user.id);
    for (let i = 0; i < rooms.length; i++) socket.join(`room${rooms[i].id}`);
    return rooms;
  }

  // get users with status
  async getUsers(userId: number, connectedUsers: UserDto[]) {
    const users: UserDto[] = await this.userService.getUsers(userId);
    users.forEach((ele1: UserDto) => {
      const connectedUser = connectedUsers.find((ele2) => ele2.id === ele1.id);
      if (connectedUser !== undefined) {
        ele1.isOnline = connectedUser.isOnline;
        ele1.inGame = connectedUser.inGame;
      } else {
        ele1.isOnline = false;
        ele1.inGame = false;
      }
      return ele1;
    });
    return users;
  }

  async getFriends(userId: number) {
    return this.prisma.friend.findMany({
      where: {
        OR: [{ user2Id: userId }, { user1Id: userId }],
      },
      select: {
        user1Id: true,
        user2Id: true,
        status: true,
      },
    });
  }
  status_broadcast(socket: mySocket) {
    socket.broadcast
      .to([...socket.rooms])
      .emit('isOnline', { id: socket.user.id, isOnline: socket.user.isOnline });
  }
}
