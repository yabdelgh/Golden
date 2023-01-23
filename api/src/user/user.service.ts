
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomStatus } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async validateUser(user: any) {
    return await this.prisma.user.upsert({
      where: { id: user.id },
      update: { email: user.email },
      create: {
        id: user.id,
        login: user.login,
        email: user.email,
        imageUrl: user.imageUrl,
      },
      select: {
        id: true,
        isTwoFactorAuthenticationEnabled: true,
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
        email: true
      },
    });
    return user;
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        login: true,
        email: true,
        imageUrl: true,
        isTwoFactorAuthenticationEnabled: true
      }
    });
    /* if (user === null)
      throw new BadRequestException('user not found');*/
    return user;
  }

  async getUserSecret(id: number): Promise<string> {
    const user = await this.prisma.user.findFirst({
      where: { id }
    });
    return user.twoFactorAuthenticationCode;
  }
  
  async getUsers(id: number) { 
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          {
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
            }
          },
          {
            FriendTo: {
              some: {
                user1Id: id
              }
            }
          },
          {
            FriendWith: {
              some: {
                user1Id: id
              }
            }
          },

        ],
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
    const user = await this.prisma.friend.deleteMany({
      where: {
        OR: [
          {
            user1Id,
            user2Id
          },
          {
            user1Id: user2Id,
            user2Id: user1Id
          }
        ]
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
    return user;
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
}