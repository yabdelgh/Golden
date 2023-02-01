import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

const validMimeImageTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
export const avatarsDist = '/avatars';

export const uploadAvatarConfig: MulterOptions = {
  storage: diskStorage({
    destination: avatarsDist,
    filename: (req, file, callback) => {
        const ext: string = extname(file.originalname);
        const id = (req.user as {id: number}).id;
        const filename = `${id}-${Date.now()}${ext}`;
        req.body.avatar = filename;
        callback(null, filename);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (validMimeImageTypes.includes(file.mimetype)) {
      callback(null, true);
      return;
    }
    callback(
      new BadRequestException(
        "Invalid file type. Only 'png', 'jpg' and 'jpeg' are allowed",
      ),
      false,
    );
  },
  limits: { fileSize: 4 * 1024 * 1024, files: 1 }, // 4MB max size
};
