const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');

const createUploadMiddleware = (folderName) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folderName,
      allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
};

module.exports = createUploadMiddleware;
