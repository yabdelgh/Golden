import { UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatRooms, RoomStatus } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { ChatService } from './chat.service';
import { chatMsgDto } from './dtos/chatMsg.dto';
import { MsgService } from './msg/msg.service';
import { RoomService } from './room/room.service';

export class mySocket extends Socket {
  user?: UserDto;
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
  namespace: 'chat',
})
@UsePipes(
  new ValidationPipe({
    whitelist: true,
  }),
)
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private roomService: RoomService,
    private msgService: MsgService,
    private chatService: ChatService,
    private userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('init');
  }

  async handleConnection(socket: mySocket) {
    try {
      let token: string = String(socket.handshake.headers.cookie);
      token = token.replace('access_token=', '');
      socket.user = await this.jwtService.verify(token, {
        secret: this.config.get('JWT_SECRET'),
      });
      socket.user.id = socket.user.sub;
      socket.emit('me', await this.userService.getUser(socket.user.id));
      socket.emit('rooms', await this.chatService.join(socket));
      socket.emit('users', await this.userService.getUsers(socket.user.id));
    } catch (err) {
      console.log(err.message);
      socket.disconnect(true);
    }
  }

  @SubscribeMessage('chatMsg')
  async handleMessage(
    @ConnectedSocket() client: mySocket,
    @MessageBody() payload: chatMsgDto,
  ) {
    const ret = await this.msgService.addMsg(client.user, payload);
    this.server.in(String(ret.roomId)).emit('chatMsg', ret);
    console.log(ret);
  }

  @SubscribeMessage('addRoom')
  async addRoom(
    @ConnectedSocket() socket: mySocket,
    @MessageBody() payload: ChatRooms,
  ) {
    try {
      const room = await this.roomService.createRoom(payload, socket.user.id);
      socket.join(String(room.id));
      const clients : any = await this.server.fetchSockets();
      for (const x in clients) {
        if (clients[x].user.id === socket.user.id)
          clients[x].join(String(room.id));
      }
      this.server.in(String(room.id)).emit('addRoom', room);
    } catch (error) {
      socket.emit('error', error.message);
    }
  }

  @SubscribeMessage('deleteRoom')
  async deleteRoom(
    @ConnectedSocket() socket: mySocket,
    @MessageBody() payload: ChatRooms,
  ) {
    try {
      payload.status = RoomStatus.Deleted;
      const room = await this.roomService.updateRoom(payload, socket.user.id);
      this.server.in(String(room.id)).emit('deleteRoom', room);
    } catch (error) {
      socket.emit('error', error.message);
    }
  }

  @SubscribeMessage('updateRoom')
  async updateRoom(
    @ConnectedSocket() socket: mySocket,
    @MessageBody() payload: ChatRooms,
  ) {
    try {
      console.log('updateRoom');
      const oldName = await this.roomService.getRoomName(payload.id);
      const room = await this.roomService.updateRoom(payload, socket.user.id);
      this.server.in(String(room.id)).emit('updateRoom', room);
      console.log(String(room.id));
    } catch (error) {
      socket.emit('error', error.message);
    }
  }

  @SubscribeMessage('joinRoom')
  joinRooom(socket, payload) {
    this.roomService.joinRoom(socket.user.id, payload.roomId, payload.password);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(socket, payload) {
    this.roomService.leaveRoom(socket.user.id, payload.roomId);
  }

  @SubscribeMessage('muteUser')
  muteUser(socket, payload) {
    this.roomService.muteUser(socket.user.id, payload.roomId, payload.victimId);
  }

  @SubscribeMessage('banUser')
  banUser(socket, payload) {
    this.roomService.banUser(socket.user.id, payload.roomId, payload.victimId);
  }

  @SubscribeMessage('addAdmin')
  addAdmin(socket, payload) {
    this.roomService.addAdmin(socket.user.Id, payload.roomId, payload.adminId);
  }

  @SubscribeMessage('removeAdmin')
  removeAdmin(socket, payload) {
    this.roomService.removeAdmin(
      socket.user.Id,
      payload.roomId,
      payload.adminId,
    );
  }

  @SubscribeMessage('invitUser')
  invitUser(socket, payload) {
    this.roomService.invitUser(
      socket.user.id,
      payload.roomId,
      payload.newUserId,
    );
  }

  handleDisconnect(socket) {
    console.log('disconnected');
  }
}
