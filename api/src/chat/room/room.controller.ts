import { Controller, Post, UseGuards } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ChatGateway } from '../chat.gateway';

@Controller('room')
export class RoomController {

    // constructor(private ChatGateway: ChatGateway) {}

    // @WebSocketServer()
    // private server: Server;

    // @Post('create')
    // @UseGuards(JwtAuthGuard)
    // async CreateRoom() {
    //     this.ChatGateway.server.in('').emit('hello');
    // }
}
