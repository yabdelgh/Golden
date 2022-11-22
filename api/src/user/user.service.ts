
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomStatus } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async validateUser(user: any) {
    return await this.prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: {
        email: user.email,
        imageUrl: user.imageUrl
      },
      create: {
        id: user.id,
        login: user.login,
        email: user.email,
        imageUrl: user.imageUrl,
      },
      select: {
        id: true,
        login: true
      }
    })
  }

  async createUser(user: any) {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async updateUser(id: number, data: any) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        login: true,
      },
    });
    return user;
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        login: true,
        email: true,
        imageUrl: true
      }
    });
    /* if (user === null)
      throw new BadRequestException('user not found');*/
    return user;
  }

  
  async getUsers(id: number) { 
    const users = await this.prisma.user.findMany({
      where:{
        UserRooms: {
          some: {
            room: {
              NOT: { status: RoomStatus.Deleted },
              RoomUsers: {
                some: {
                  userId: id
                }
              }
            }
          }
        },
        NOT: {id}
      },
      select: {
        id: true,
        login: true,
        email: true,
        imageUrl: true,
      }
    });
    return users;
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        login: true,
      },
    });
    return user;
  }

  async findUser(login: string) {
    const users = await this.prisma.user.findMany({
      where: {
        login,
      },
      select: {
        id: true,
        login: true,
      },
    });
    return users;
  }

  async blockUser(blockerId: number, blockedId: number) {
    const user = await this.prisma.blockedUser.create({
      data: {
        blockerId,
        blockedId,
      },
    });
    return user;
  }

  async unblockUser(blockerId: number, blockedId: number) {
    const user = await this.prisma.blockedUser.delete({
      where: {
        blockerId_blockedId: { blockerId, blockedId },
      },
    });
    return user;
  }

  async getBlockedUsers(blockerId: number) {
    const users = await this.prisma.blockedUser.findMany({
      where: {
        blockerId,
      },
      select: {
        blockedId: true,
      },
    });
    return users;
  }

  async addFriend(userId: number, friendId: number) {
    const user = await this.prisma.friend.create({
      data: {
        user1Id: userId,
        user2Id: friendId,
      },
    });
    return user;
  }

  async removeFriend(user1Id: number, user2Id: number) {
    const user = await this.prisma.friend.delete({
      where: {
        user1Id_user2Id: { user1Id, user2Id },
      },
    });
    return user;
  }

  async acceptFriend(userId: number, friendId: number) {
    const user = await this.prisma.friend.update({
      where: {
        user1Id_user2Id: { user1Id: friendId, user2Id: userId },
      },
      data: {
        status: true,
      },
    });
  }

  async upload(file, user): Promise<any> {
    const { id } = user;
    const us = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        imageUrl: '/uploads/' + file.filename,
      },
    });
    return us.imageUrl;
  }

  async changeUsername(body, user): Promise<any> {
    const { id } = user;
    const { username } = body;
    const us = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        login: user.login
      },
    })
  }
}