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
    },
  });
  // const uploader = multer({
  //   storage: storageConfig,
  //   limits: {
  //     fileSize: 1000000, //Byte
  //   },
  //   fileFilter: (req, file, cb) => {
  //     console.log(file.mimetype);
  //     if (file.mimetype.split("/")[0] != fileType) {
  //       return cb(null, false);
  //     }
  //     if (file.mimetype.split("/")[1] != "jpeg") {
  //       return cb(null, false);}

  //     cb(null, true);
  //   },
  // });
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
      console.log(file.mimetype);

      if (!allowedFileTypes.includes(file.mimetype)) {
        return cb(
          new Error(
            "Tipe file yang diunggah harus berupa gambar JPEG, PNG, atau GIF"
          )
        );
      }

      cb(null, true);
    },
  });
  return uploader;
};

const upload = multer({
  limits: {
    fileSize: 1000000, //Byte
  },
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (file.mimetype.split("/")[0] != "image") {
      return cb(null, false);
    }
    cb(null, true);
  },
});

module.exports = { fileUploader, upload };

// exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });
