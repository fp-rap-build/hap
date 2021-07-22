const aws = require('../../../../../config/aws');
const s3 = new aws.S3();
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime
  const doesMimetypeExist = filetypes.test(file.mimetype);

  if (doesMimetypeExist && extname) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only images and pdfs are allowed'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },
    contentDisposition: 'inline',
  }),
});

module.exports = upload;
