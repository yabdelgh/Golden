import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class chatRoomDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  access?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsBoolean()
  isGroupChat?: boolean;
}
