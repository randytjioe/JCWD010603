const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
const {fileUploader} = require("../middleware/multer");
const uploadSingle = fileUploader({destinationFolder : "IMAGE_PRODUCT"}).single('imgProduct')

 router.post("/create", uploadSingle, productController.create);
 router.patch("/edit/:id", uploadSingle, productController.edit);
 router.delete("/delete/:id", uploadSingle, productController.delete);



module.exports = router