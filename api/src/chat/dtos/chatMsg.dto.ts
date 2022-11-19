import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class chatMsgDto {
  @IsNumber()
  roomId: number;

  @IsString()
  @IsNotEmpty()
  msg: string;
}