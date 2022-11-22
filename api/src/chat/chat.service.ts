import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { mySocket } from './chat.gateway';
import { RoomService } from './room/room.service';

@Injectable()
export class ChatService {
  constructor(
    private roomService: RoomService,
    private userService: UserService) { }

  async join(socket: mySocket) {
    const rooms: any = await this.roomService.getRooms(socket.user.id);
    if (rooms.length !== 0)
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

}
