import multer from 'multer';
import crypto from 'crypto';
import { resolve, extname } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        const fileName = res.toString('hex');
        const extension = extname(file.originalname);

        return cb(null, `${fileName}${extension}`);
      });
    },
  }),
};
