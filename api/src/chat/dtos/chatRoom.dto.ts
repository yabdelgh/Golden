import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class chatRoomDto {
   
    @IsNumber()
    id: number;
    
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    status?: string;
    
    @IsOptional()
    @IsString()
    access?: string;
    
    @IsOptional()
    @IsString()
    password?: string;
}
