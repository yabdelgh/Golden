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
  sub?: number;
  
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
  @IsString()
  @IsNotEmpty()
  twoFactorAuthenticationCode?: String;
}
