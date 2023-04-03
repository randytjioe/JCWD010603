const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const { validate, userValidateRules } = require("../middleware/validator");
const { userController } = require("../controller");
const { fileUploader, upload } = require("../middleware/multer");
const { verifyToken } = require("../middleware/auth");

router.post(
  "/register",
  userValidateRules(),
  validate,
  userController.register
);
// router.patch(
//   "/updatefoto/:UserId",
//   fileUploader({
//     destinationFolder: "IMAGE_PRODUCT",
//     fileType: "image",
//     prefix: "POST",
//   }).single("image"),
//   userController.updateFoto
// );
// router.patch("/updatefoto", upload.single("image"), userController.updateFoto);
// router.get("/avatar/:id", userController.renderAvatar);
// router.patch("/editpassword", verifyToken, userController.editPassword);
router.get("/verify/:token", userController.verify);
router.get("/keeplogin", userController.keeplogin);
router.post("/userlogin", userController.login);
router.post("/addaddress", userController.addAddress);
router.post("/request-reset", userController.resetRequest);
router.post("/reset-password/:token", userController.resetPassword);
router.patch("/editaddress", userController.updateAddress);
router.get("/cart", userController.getCartData);
router.delete("/deleteCart/:id", userController.deleteCartData);
router.post("/addCart", userController.createCartData);

module.exports = router;
