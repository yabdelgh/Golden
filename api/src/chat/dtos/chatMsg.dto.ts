import {
  IsBoolean,
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

export class MuteDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  roomId: number;
  @IsBoolean()
  value: boolean;
}

export class BanDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  roomId: number;
  @IsBoolean()
  value: boolean;
}

export class RoleDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  roomId: number;
  @IsString()
  role: string;
}

export class JoinRoomDto {
  @IsNumber()
  roomId: number;
  @IsString()
  password?: string;
}

export class LeaveRoomDto {
  @IsNumber()
  roomId: number;
}

type RoomStatus = 'Opened' | 'Closed' | 'Deleted';
type RoomAccess = 'Private' | 'Protected' | 'Public' | 'DirectMessage';

export class ChatRooms {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  status: RoomStatus;
  @IsString()
  access: RoomAccess;
  @IsString()
  @IsOptional()
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}
