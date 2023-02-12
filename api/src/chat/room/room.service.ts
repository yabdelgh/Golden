import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoomUser, RoomUserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomUserRole, RoomStatus, RoomAccess } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { chatRoomDto } from '../dtos/chatRoom.dto';
import { WsException } from '@nestjs/websockets';
import { MsgService } from '../msg/msg.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService, private msgService: MsgService) {}

  async hash(password: any) {
    if (password === undefined) return '';
    const hash = await argon.hash(password);
    return hash;
  }

  async getRooms(userId: number): Promise<chatRoomDto[]> {
    const rooms: chatRoomDto[] = await this.prisma.chatRooms.findMany({
      where: {
        NOT: { OR: [{ status: RoomStatus.Deleted }, { name: '' }] },
        RoomUsers: {
          some: {
            userId,
            NOT: { ban: true },
            status: RoomUserStatus.Member,
          },
        },
      },
      select: {
        id: true,
        name: true,
        access: true,
        RoomUsers: {
          select: {
            userId: true,
            role: true,
            ban: true,
            mute: true,
            status: true,
          },
        },
      },
    });
    return rooms.map((ele: chatRoomDto) => {
      return { ...ele, isGroupChat: true };
    });
  }

  async getDMRooms(userId: number): Promise<any> {
    const rooms: any = await this.prisma.chatRooms.findMany({
      where: {
        name: '',
        NOT: { status: RoomStatus.Deleted },
        RoomUsers: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        RoomUsers: {
          where: {
            NOT: { userId },
          },
          select: {
            userId: true,
            user: true,
          },
        },
      },
    });

    return rooms.map((ele: any) => {
      return {
        id: ele.id,
        name: ele.RoomUsers[0].user.login,
        isGroupChat: false,
      };
    });
  }

  async getRoom(roomId: number) {
    try {
      const ret = await this.prisma.chatRooms.findFirst({
        where: {
          id: roomId,
          NOT: { status: RoomStatus.Deleted },
        },
        select: {
          id: true,
          name: true,
          status: true,
          access: true,
          RoomUsers: {
            select: {
              userId: true,
              role: true,
              ban: true,
              mute: true,
              status: true,
            },
          },
        },
      });
      return {
        ...ret,
        isGroupChat: ret.name !== '',
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError)
        if (err.code === 'P2002')
          throw new ForbiddenException('room name already exist');
    }
  }

  async createDirectMsgRoom(user1Id: number, user2Id: number) {
    try {
      const ret = await this.prisma.chatRooms.create({
        data: {
          name: '',
          RoomUsers: {
            create: [{ userId: user1Id }, { userId: user2Id }],
          },
        },
        select: {
          id: true,
          RoomUsers: {
            select: {
              userId: true,
              user: true,
            },
          },
        },
      });
      return ret;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError)
        if (err.code === 'P2002')
          throw new ForbiddenException('room already exist');
    }
  }

  async createRoom(room: chatRoomDto, ownerId: number) {
    try {
      const ret = await this.prisma.chatRooms.create({
        data: {
          name: room.name,
          access: RoomAccess[room.access],
          password: await this.hash(room.password),
          RoomUsers: {
            create: {
              role: RoomUserRole.Owner,
              userId: ownerId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          status: true,
          access: true,
          RoomUsers: {
            select: {
              userId: true,
              role: true,
              ban: true,
              mute: true,
              status: true,
            },
          },
        },
      });
      return ret;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError)
        if (err.code === 'P2002')
          throw new ForbiddenException('room name already exist');
    }
  }

  async updateRoom(room: chatRoomDto, userId: number) {
    try {
      const ret1 = await this.prisma.chatRooms.findFirst({
        where: {
          id: room.id,
          RoomUsers: {
            some: {
              userId,
              role: RoomUserRole.Owner,
            },
          },
          NOT: {
            status: RoomStatus.Deleted,
          },
        },
      });
      if (ret1) {
        const ret2 = await this.prisma.chatRooms.update({
          where: {
            id: ret1.id,
          },
          data: {
            name: room.name,
            access: RoomAccess[room.access],
            status: RoomStatus[room.status],
            password: room.password
              ? await argon.hash(room.password)
              : ret1.password,
          },
          select: {
            id: true,
            name: true,
            access: true,
            RoomUsers: {
              select: {
                userId: true,
                role: true,
                ban: true,
                mute: true,
                status: true,
              },
            },
          },
        });
        return ret2;
      } else throw new ForbiddenException('Ambiguous credentials');
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError)
        if (err.code === 'P2002')
          throw new ForbiddenException('room name already exist');
    }
  }

  async addAdmin(ownerId: number, roomId: number, adminId: number) {
    const room = await this.prisma.chatRooms.findFirst({
      where: {
        id: roomId,
        RoomUsers: {
          some: {
            AND: [
              { userId: ownerId, role: RoomUserRole.Owner },
              { userId: adminId, role: RoomUserRole.User },
            ],
          },
        },
        NOT: {
          status: RoomStatus.Deleted,
        },
      },
    });

    if (room)
      await this.prisma.roomUser.update({
        where: {
          roomId_userId: { roomId, userId: adminId },
        },
        data: {
          role: RoomUserRole.Admin,
        },
      });
    else throw new ForbiddenException('Ambiguous credentials');
  }

  async removeAdmin(ownerId: number, roomId: number, adminId: number) {
    const room = await this.prisma.chatRooms.findFirst({
      where: {
        id: roomId,
        RoomUsers: {
          some: {
            AND: [
              { userId: ownerId, role: RoomUserRole.Owner },
              { userId: adminId, role: RoomUserRole.Admin },
            ],
          },
        },
        NOT: {
          status: RoomStatus.Deleted,
        },
      },
    });

    if (room)
      await this.prisma.roomUser.update({
        where: {
          roomId_userId: { roomId, userId: adminId },
        },
        data: {
          role: RoomUserRole.User,
        },
      });
    else throw new ForbiddenException('Ambiguous credentials');
  }

  async muteUser(
    adminId: number,
    roomId: number,
    victimId: number,
    value: boolean,
  ) {
    const room = await this.prisma.chatRooms.findFirst({
      where: {
        id: roomId,
        OR: [
          {
            RoomUsers: {
              some: {
                userId: adminId,
                role: RoomUserRole.Owner,
              },
            },
          },
          {
            AND: [
              {
                RoomUsers: {
                  some: {
                    userId: adminId,
                    NOT: { role: RoomUserRole.User },
                  },
                },
              },
              {
                RoomUsers: {
                  some: {
                    userId: victimId,
                    role: RoomUserRole.User,
                  },
                },
              },
            ],
          },
        ],
        NOT: {
          status: RoomStatus.Deleted,
        },
      },
    });
    if (room)
      return await this.prisma.roomUser.update({
        where: {
          roomId_userId: { roomId, userId: victimId },
        },
        data: {
          mute: value,
        },
      });
    return undefined;
  }

  async banUser(
    adminId: number,
    roomId: number,
    victimId: number,
    value: boolean,
  ) {
    const room = await this.prisma.chatRooms.findFirst({
      where: {
        id: roomId,
        OR: [
          {
            RoomUsers: {
              some: {
                userId: adminId,
                role: RoomUserRole.Owner,
              },
            },
          },
          {
            AND: [
              {
                RoomUsers: {
                  some: {
                    userId: adminId,
                    NOT: { role: RoomUserRole.User },
                  },
                },
              },
              {
                RoomUsers: {
                  some: {
                    userId: victimId,
                    role: RoomUserRole.User,
                  },
                },
              },
            ],
          },
        ],
        NOT: {
          status: RoomStatus.Deleted,
        },
      },
    });
    if (room)
      return await this.prisma.roomUser.update({
        where: {
          roomId_userId: { roomId, userId: victimId },
        },
        data: {
          ban: value,
        },
      });
    return undefined;
  }

  async role(adminId: number, roomId: number, victimId: number, role: string) {
    const room = await this.prisma.chatRooms.findFirst({
      where: {
        id: roomId,
        RoomUsers: {
          some: {
            userId: adminId,
            role: RoomUserRole.Owner,
          },
        },
        NOT: {
          status: RoomStatus.Deleted,
        },
      },
    });
    if (room) {
      return await this.prisma.roomUser.update({
        where: {
          roomId_userId: { roomId, userId: victimId },
        },
        data: {
          role: RoomUserRole[role],
        },
      });
    }
    return undefined;
  }

  async joinRoom(userId: number, roomId: number, password?: string) {
    const room = await this.prisma.chatRooms.findFirst({
      where: {
        id: roomId,
        status: RoomStatus.Opened,
        NOT: { access: RoomAccess.Private },
        RoomUsers: { none: { userId, ban: true } },
      },
    });
    if (room) {
      if (room.access === RoomAccess.Protected) {
        const tt = await argon.verify(room.password, password);
        if (!tt) throw new WsException('password incorrect');
      }
      try {
        const roomUser: RoomUser = await this.prisma.roomUser.upsert({
          where: {
            roomId_userId: { roomId, userId },
          },
          update: { status: RoomUserStatus.Member },
          create: {
            userId,
            roomId,
          },
        });
        return roomUser;
      } catch (err) {
        throw new WsException(err.message);
      }
    } else throw new WsException('Ambiguous credentials');
  }

  async invitUser(userId: number, roomId: number, newUserId: number) {
    const room = await this.prisma.chatRooms.findFirst({
      where: {
        id: roomId,
        RoomUsers: {
          some: {
            userId,
            NOT: { role: RoomUserRole.User },
          },
        },
      },
    });
    if (room)
      await this.prisma.roomUser.create({
        data: {
          roomId,
          userId: newUserId,
          status: RoomUserStatus.Invit,
        },
      });
    else throw new ForbiddenException('Ambiguous credentials');
  }

  async leaveRoom(userId: number, roomId: number): Promise<string> {
    try {
      const msg = await this.msgService.getFirstMsg(userId, roomId);
      if (msg) {
        await this.prisma.roomUser.update({
          where: {
            roomId_userId: { roomId, userId },
          },
          data: {
            status: RoomUserStatus.ExMember,
          },
        });
        return 'leaveRoom';
      } else {
        await this.prisma.roomUser.delete({
          where: {
            roomId_userId: { roomId, userId },
          },
        });
        return 'removeFromRoom';
      }
    } catch (err) {
      throw new WsException('Ambiguous credentials');
    }
  }

  async getRoomName(roomId: number) {
    const ret = await this.prisma.chatRooms.findFirst({
      where: {
        id: roomId,
      },
    });
    return ret.name;
  }
}
