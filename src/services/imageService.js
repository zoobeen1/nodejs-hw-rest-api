const multer = require('multer');
const Jimp = require('jimp');
const uuid = require('uuid').v4;
const path = require('path');
const fse = require('fs-extra');

const { httpError } = require('../utils');

class ImageService {
  // Midleware
  static initUploadImage(field) {
    const multerStorage = multer.memoryStorage();
    const multerFilter = (req, file, cbk) => {
      if (file.mimetype.startsWith('image/')) {
        cbk(null, true);
      } else cbk(httpError(400, 'Images only!!!'));
    };
    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(field);
  }

  // Image resize and save

  static async imageSave(
    file,
    options = { maxSize: 1, height: 250, width: 250 },
    ...pathSegments
  ) {
    // Restructuring and defaults
    const maxSize = options.maxSize ?? 1;
    const height = options.height ?? 250;
    const width = options.width ?? 250;

    if (file.size > maxSize * 1024 * 1024) {
      throw httpError(400, 'File is too large!!!');
    }
    const fileName = `${uuid()}.jpg`;
    const fullPath = path.join(
      process.cwd(),
      'public',
      ...pathSegments
    );
    await fse.ensureDir(fullPath);
    // JIMP
    Jimp.read(file.buffer, (err, img) => {
      if (err) throw err;
      img
        .resize(height, width)
        .quality(80)
        .write(path.join(fullPath, fileName));
    });
    const url = path.posix.join(...pathSegments, fileName);
    return url;
  }
}
module.exports = ImageService;
