const multer = require('multer')
const {nanoid} = require('nanoid')

const fileUploader = ({
    destinationFolder = "",
    fileType = "image"
}) => {
    const fileStorage = multer.diskStorage({
        destination : (req,file,cb) => {
           return cb(null, `${__dirname}/../public/${destinationFolder}`)
        },
        filename : (req,file,cb) => {
            const extension = file.mimetype.split("/")[1]
            const imgName = nanoid() 

            cb(null, `${imgName}.${extension}`)
        }
    })

    const uploader = multer({
        storage: fileStorage,
        limits: {
          fileSize: 1000000, //Byte
        },
        fileFilter: (req, file, cb) => {
          console.log(file);
          if (file.mimetype.split("/")[0] != fileType) {
            return cb(null, false);
          }
          if (file.mimetype.split("/")[1] != "jpg" || "png" || "gif" || "jpeg") {
            return cb(null, false);
          }
          cb(null, true);
        },
    })

    return uploader
}

module.exports = fileUploader