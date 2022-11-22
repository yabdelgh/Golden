import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class chatMsgDto {
  @IsNumber()
  roomId: number;
 
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsString()
  @IsNotEmpty()
  msg: string;
}