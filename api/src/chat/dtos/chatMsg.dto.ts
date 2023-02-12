import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

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
export class BlockUserDto {
  @IsNumber()
  blockedId: number;
}
export class searchDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  search: string;
}
