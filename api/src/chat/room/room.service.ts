import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoomUserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomUserRole, RoomStatus, RoomAccess } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { chatRoomDto } from '../dtos/chatRoom.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

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
          },
        },
      },
    });

    return rooms;
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
        name: true,
        RoomUsers: {
          where: {
            NOT: { userId },
          },
          select: {
            userId: true,
          },
        },
      },
    });
    for (const ele of rooms) {
      const user = await this.prisma.user.findFirst({
        where: {
          id: ele.RoomUsers[0].userId,
        },
      });
      ele.name = user.login;
    }
    return rooms;
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

  async role(
    adminId: number,
    roomId: number,
    victimId: number,
    role: string,
  ) {
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
    if (room)
    {
      console.log(role);
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
      },
    });
    if (room) {
      if (room.access === RoomAccess.Protected) {
        const tt = await argon.verify(room.password, password);
        if (!tt) throw new ForbiddenException('password incorrect');
      }
      await this.prisma.roomUser.create({
        data: {
          roomId,
          userId,
        },
      });
    } else throw new ForbiddenException('Ambiguous credentials');
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

  async leaveRoom(userId: number, roomId: number) {
    const ret = await this.prisma.roomUser.update({
      where: {
        roomId_userId: { roomId, userId },
      },
      data: {
        status: RoomUserStatus.ExMember,
      },
    });
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
