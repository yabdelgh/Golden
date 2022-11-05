import { ForbiddenException, Injectable } from '@nestjs/common';
import { ChatRooms, RoomUserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomUserRole, RoomStatus, RoomAccess } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async hash(password: any) {
    if (password === undefined) return '';
    const hash = await argon.hash(password);
    return hash;
  }

  async getRooms(userId: number) { 
    return this.prisma.roomUser.findMany({
      where: {
        userId,
        room: {
          NOT: { status: RoomStatus.Deleted },
        }
      },
      select: {
        role: true,
        ban: true,
        mute: true,
        room: {
          select: {
            id: true,
            name: true,
            status: true,
            access: true,
          }
        }
      },
    })
  }

  async createRoom(room: ChatRooms, ownerId: number) {
    try {
      const ret = await this.prisma.roomUser.create({
        data: {
          role: RoomUserRole.Owner,
          room: {
            create: {
              name: room.name,
              status: room.status,
              access: RoomAccess[room.access],
              password: await this.hash(room.password),
            },
          },
          user: {
            connect: {
              id: ownerId,
            },
          },
        },
      });
      return ret;
    } catch (err) {
      console.log(err);
      if (err instanceof PrismaClientKnownRequestError)
        if (err.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
    }
  }

  async updateRoom(room: ChatRooms, userId: number) {
    const ret = await this.prisma.chatRooms.findFirst({
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

    if (room)
      await this.prisma.chatRooms.update({
        where: {
          id: room.id,
        },
        data: {
          name: room.name,
          status: room.status,
          access: RoomAccess[room.access],
          password: await argon.hash(room.password),
        },
      });
    else throw new ForbiddenException('Ambiguous credentials');
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

  async muteUser(adminId: number, roomId: number, victimId: number) {
    const room = await this.prisma.chatRooms.findFirst({
      where: {
        id: roomId,
        RoomUsers: {
          some: {
            AND: [
              { userId: adminId, NOT: { role: RoomUserRole.User } },
              { userId: victimId, role: RoomUserRole.User },
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
          roomId_userId: { roomId, userId: victimId },
        },
        data: {
          mute: true,
        },
      });
    else throw new ForbiddenException('Ambiguous credentials');
  }

  async banUser(adminId: number, roomId: number, victimId: number) {
    const room = await this.prisma.chatRooms.findFirst({
      where: {
        id: roomId,
        RoomUsers: {
          some: {
            AND: [
              { userId: adminId, NOT: { role: RoomUserRole.User } },
              { userId: victimId, role: RoomUserRole.User },
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
          roomId_userId: { roomId, userId: victimId },
        },
        data: {
          ban: true,
        },
      });
    else throw new ForbiddenException('Ambiguous credentials');
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
}
