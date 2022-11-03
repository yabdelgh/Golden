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
import { Server, Socket } from 'socket.io';
import { UserDto } from 'src/user/dtos/user.dto';
import { ChatService } from './chat.service';
import { chatMsgDto } from './dtos/chatMsg.dto';
import { MsgService } from './msg/msg.service';
import { RoomService } from './room/room.service';

export class mySocket extends Socket {
  user?: UserDto;
}

@WebSocketGateway({
  cors: {
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
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('init');
  }

  async handleConnection(socket: mySocket) {
    try {
      let token: string = String(socket.handshake.headers.autorisation);
      socket.user = await this.jwtService.verify(token, {
        secret: this.config.get('JWT_SECRET'),
      });
      socket.emit('rooms', await this.chatService.join(socket));
    } catch (err) {
      console.log(err.message);
      socket.disconnect(true);
    }
  }

  @SubscribeMessage('chatMessage')
  async handleMessage(
    @ConnectedSocket() client: mySocket,
    @MessageBody() payload: chatMsgDto,
  ) {
    const ret = await this.msgService.addMsg(client.user, payload);
    this.server.emit('message', payload);
    // client.emit('message', 'hana>');
    // client.broadcast.to(ret.room.name).emit('message', payload);
  }

  @SubscribeMessage('createRoom')
  createRoom(socket, payload) {
    console.log('createRoome');
    return this.roomService.createRoom(payload, socket.user.id);
  }

  @SubscribeMessage('updateRoom')
  updateRoom(socket, payload) {
    this.roomService.updateRoom(socket.user.id, payload);
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