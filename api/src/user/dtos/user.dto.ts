import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  login?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isTwoFactorAuthenticationEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  isOnline?: boolean;

  @IsOptional()
  @IsBoolean()
  inGame?: boolean;

  @IsOptional()
  @IsNumber()
  gameId?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  twoFactorAuthenticationCode?: string;
}
