import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MsgService } from './msg.service';

@Module({
  imports: [PrismaModule],
  providers: [MsgService],
  exports: [MsgService],
})
export class MsgModule {}
