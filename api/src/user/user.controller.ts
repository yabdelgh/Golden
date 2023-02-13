import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  UseGuards,
  Post,
  Delete,
  Req,
  Patch,
  UseInterceptors,
  UploadedFile,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { storage } from '../utils';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dtos/user.dto';

/*export const storage = {
  storage: diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extention: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extention}`);
    },
  }),
};*/

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userservice: UserService) {}

  @Get()
  async getUser(@Query('id', ParseIntPipe) id: number) {
    const ret = await this.userservice.getUser(id);
    return ret;
  }

  @Post('block')
  async blockUser(@Query('id', ParseIntPipe) id: number, @Req() { user }) {
    return this.userservice.blockUser(user.id, id);
  }

  @Delete('block')
  async unblockUser(@Query('id', ParseIntPipe) id: number, @Req() { user }) {
    return this.userservice.unblockUser(user.id, id);
  }

  @Get('block')
  async getBlokedUsers(@Req() { user }) {
    return this.userservice.getBlockedUsers(user.id);
  }

  @Patch('update')
  @UseInterceptors(
    FileInterceptor('imageUrl', {
      storage,
    }),
  )
  update(
    @UploadedFile() imageUrl: Express.Multer.File,
    @Body() data: UpdateUserDto,
    @Req() req,
  ) {
    const user = req.user;
    return this.userservice.updateUser(user.id, {
      ...data,
      file: undefined,
      imageUrl: `${process.env.BACKEND_HOST || 'http:://localhost:3333'}/${
        imageUrl.filename
      }`,
    });
  }

  /* @Post()
  async createUser(@Body() user) {
    return this.userservice.createUser(user);
  }
  @Patch('update')
  async updateUser(@Req() { user }, @Body() payload: UserDto) {
    this.userservice.updateUser(user.id, payload);
  }


  @Get('me')
  async getCurrentUser(@Req() { user }) {
    return this.userservice.getUser(user.id);
  }

  @Get('find')
  async findUser(@Query('username') username: string) {
    return this.userservice.findUser(username);
  }
  

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  async upload(@UploadedFile() file, @Request() req): Promise<any> {
    const user = req.user;
    return this.userservice.upload(file, user);
  }

  @Post('changeusername')
  // prisma update username
  async changeUsername(@Body() body, @Request() req): Promise<any> {
    const user = req.user;
    return this.userservice.changeUsername(body, user);
  }*/
}
