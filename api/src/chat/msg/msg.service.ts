import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { RoomUserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/user/dtos/user.dto';
import { chatMsgDto } from '../dtos/chatMsg.dto';

@Injectable()
export class MsgService {
  constructor(private prisma: PrismaService) {}

  async addMsg(user: UserDto, payload: chatMsgDto) {
    const ret = this.prisma.roomUser.findFirst({
      where: {
        userId: user.id,
        roomId: user.id,
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
      const message = this.prisma.roomUserMsg
        .create({
          data: {
            roomId: payload.roomId,
            userId: user.id,
            msg: payload.message,
          },
        })
        .then((data) => console.log(data))
        .catch(() => console.log('error'));
      return ret;
    } else throw new WsException('Unauthorized');
  }

  async removeMsg(msgId: number) {}

  async updateMsg(msgId: number, msg: string) {}

  async getMsg(msgId: number) {}

  async getRoomMsg(roomId: number) {}
}
