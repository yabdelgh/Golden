import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    RedisModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    PrismaModule,
    ChatModule,
    GameModule],
})
export class AppModule {}
