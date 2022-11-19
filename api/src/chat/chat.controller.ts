import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoomService } from './room/room.service';

interface Room {
    [key: string]: any
}


@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor (private roomService: RoomService) { }
    
    @Get('/rooms')
    async getMyChats(@Req() { user }: any): Promise<Room> { 
        return this.roomService.getRooms(user.id);
    }

    @Post('/newRoom')
    async createRoom(@Req() { user }, @Body() room) { 
        return this.roomService.createRoom(room, user.id)
    };
}
