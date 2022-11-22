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
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ChatRooms, RoomStatus } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { ChatService } from './chat.service';
import { chatMsgDto } from './dtos/chatMsg.dto';
import { MsgService } from './msg/msg.service';
import { RoomService } from './room/room.service';
import { chatRoomDto } from './dtos/chatRoom.dto';

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

  afterInit() { }
  
  async getUserFromsocket(socket: Socket) : Promise<UserDto>{
      let token: string = String(socket.handshake.headers.cookie);
      token = token.replace('access_token=', '');
      const user =   await this.jwtService.verify(token, {
        secret: this.config.get('JWT_SECRET'),
      });
      user.isOnline = true;
      return user;
  }

  async getConnectedUsers() : Promise<UserDto[]>{
      const clients: any = await this.server.fetchSockets();
      return clients.map((ele: { user: UserDto }) => ele.user);
  }

  status_broadcast(socket: mySocket) {
    // emit the status to all clients in the rooms, except sender
    socket.broadcast.to([...socket.rooms])
      .emit('isOnline', { userId: socket.user.id, status: true });
  }

  msg_broadcast(msg: chatMsgDto) {
    // emit the msg to all clients in the room, include sender
    this.server.in(String(msg.roomId)).emit('chatMsg', msg);
   }
  
  async handleConnection(socket: mySocket) {
    try
    {
      socket.user = await this.getUserFromsocket(socket);
      console.log(socket.user);
      socket.emit('me', await this.userService.getUser(socket.user.id));
      socket.emit('rooms', await this.chatService.join(socket));
      socket.emit('users', await this.chatService.getUsers(socket.user.id, await this.getConnectedUsers()));
      this.status_broadcast(socket);
    }
    catch
    {
      socket.disconnect(true);
    }
  }

  @SubscribeMessage('chatMsg')
  async handleMessage(
    @ConnectedSocket() client: mySocket,
    @MessageBody() payload: chatMsgDto,
  ) {
    payload.userId = client.user.id;
    const msg = await this.msgService.addMsg(payload);
    this.msg_broadcast(msg);
  }

  @SubscribeMessage('addRoom')
  async addRoom(
    @ConnectedSocket() socket: mySocket,
    @MessageBody() payload: chatRoomDto,
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
    @MessageBody() payload: chatRoomDto,
  ) {
    try {
      payload.status = RoomStatus.Deleted;
      const room = await this.roomService.updateRoom(payload, socket.user.id);
      this.server.in(String(room.id)).emit('deleteRoom', room);
      this.server.socketsLeave(String(room.id));
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
      const oldName = await this.roomService.getRoomName(payload.id);
      const room = await this.roomService.updateRoom(payload, socket.user.id);
      this.server.in(String(room.id)).emit('updateRoom', room);
    } catch (error) {
      socket.emit('error', error.message);
    }
  }
  
  @SubscribeMessage('isOnline')
  async isOnline(
    @ConnectedSocket() socket: mySocket,
    @MessageBody() status: boolean) {
    socket.user.isOnline = status;
    socket.broadcast.to([...socket.rooms]).emit('isOnline', {userId: socket.user.id, status});
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

  handleDisconnect(@ConnectedSocket() socket: mySocket) {
    if (socket.user)
      socket.broadcast.to([...socket.rooms]).emit('isOnline', {userId: socket.user.id, status: false});
  }
}
