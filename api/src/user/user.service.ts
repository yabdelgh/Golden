
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async validateUser(user: any) {
    return await this.prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: {
        email: user.email,
      },
      create: {
        id: user.id,
        login: user.login,
        email: user.email,
   //     imageUrl: user.imageUrl,
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
      }
    });
    /* if (user === null)
      throw new BadRequestException('user not found');*/
    return user;
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

  /* async upload(file, user): Promise<any> {
    const { id } = user;
    console.log(file, id);
    const us = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        avatarUrl: '/uploads/' + file.filename,
      },
    });
    return us.avatarUrl;
  }*/

/*  async changeUsername(body, user): Promise<any> {
    const { id } = user;
    const { username } = body;
    console.log(body);
    const us = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
      },
    });
    return us;
  }*/
}