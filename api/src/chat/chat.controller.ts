import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoomService } from './room/room.service';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor (private roomService: RoomService) { }
    
    @Get('/rooms')
    async getMyChats(@Req() { user }) { 
        return this.roomService.getRooms(user.id);
    }
}
