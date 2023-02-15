import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { RoomUserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { chatMsgDto } from '../dtos/chatMsg.dto';

@Injectable()
export class MsgService {
  constructor(private prisma: PrismaService) {}

  formatDate(date: Date): string {
    const current: Date = new Date();
    if (date.toLocaleDateString() === current.toLocaleDateString())
      return date.toLocaleTimeString();
    return date.toLocaleDateString();
  }

  async addMsg(msg: chatMsgDto) {
    const ret = await this.prisma.roomUser.findFirst({
      where: {
        userId: msg.userId,
        roomId: msg.roomId,
        ban: false,
        mute: false,
        status: RoomUserStatus.Member,
      },
      select: {
        room: {
          select: { name: true },
        },
      },
    });
    if (ret) {
      const message: any = await this.prisma.roomUserMsg.create({
        data: {
          roomId: msg.roomId,
          userId: msg.userId,
          msg: msg.msg,
        },
      });
      message.createdAt = this.formatDate(message.createdAt);
      return message;
    } else throw new WsException('Unauthorized');
  }

  async getFirstMsg(userId: number, roomId: number) {
    return await this.prisma.roomUserMsg.findFirst({
      where: {
        roomId: roomId,
        userId: userId,
      },
    });
  }
}
