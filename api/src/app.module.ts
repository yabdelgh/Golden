import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { avatarsDist } from './user/avatar.config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: avatarsDist,
      serveRoot: '/avatars'
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    PrismaModule,
    ChatModule,
    GameModule],
})
export class AppModule {}
