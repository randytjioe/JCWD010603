const multer = require("multer");
const { nanoid } = require("nanoid");

const fileUploader = ({
  destinationFolder = "",
  prefix = "POST",
  fileType = "image",
}) => {
  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../public/${destinationFolder}`);
    },
    filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split("/")[1];

      const filename = `${prefix}_${nanoid()}.${fileExtension}`;

      cb(null, filename);

      console.log(filename);
    },
  });

  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];

  const uploader = multer({
    storage: storageConfig,
    limits: {
      fileSize: 1000000, // Byte
    },
    fileFilter: (req, file, cb) => {
       if (file.mimetype.split("/")[0] != fileType) {
        console.log('error file type');
       return cb(null, false);      
       }
      if (!allowedFileTypes.includes(file.mimetype)) {
        return cb(null, false);
      }

      cb(null, true);
    },
  });
  return uploader;
};

// const upload = multer({
//   limits: {
//     fileSize: 1000000, //Byte
//   },
//   fileFilter: (req, file, cb) => {
//     console.log(file);
//     if (file.mimetype.split("/")[0] != "image") {
//       return cb(null, false);
//     }
//     cb(null, true);
//   },
// });

module.exports = { fileUploader};
