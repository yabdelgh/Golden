import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './uploads',
  filename: async (req, file, callback) => {
    req.body.file = generateFilename(file);
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  return `${Date.now()}${extname(file.originalname)}`;
}
