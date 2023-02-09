import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
// model games {
//   id Int @id @default(autoincrement())
//   redCornerId Int
//   redCornerScore Int
//   redCorner User @relation(name:"fk_redCorner", fields: [redCornerId], references: [id])
//   blueCornerId Int
//   blueCornerScore Int
//   blueCorner User @relation(name:"fk_blueCorner", fields: [blueCornerId], references: [id])
//   createdAt DateTime @default(now())
//   map String @default("default")
// }

export class GameDto {
  @ApiProperty({ required: false })
  @IsInt()
  id: number;
  @ApiProperty({ required: false })
  @IsInt()
  redCornerId: number;
}
