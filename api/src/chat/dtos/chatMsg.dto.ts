import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class chatMsgDto {
  @IsNumber()
  roomId: number;
 
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  msg: string;
}