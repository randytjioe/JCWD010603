const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const { validate, userValidateRules } = require("../middleware/validator");
const { userController } = require("../controller");
const { upload } = require("../middleware/multer");
const { verifyToken } = require("../middleware/auth");

router.post(
  "/register",
  userValidateRules(),
  validate,
  userController.register
);
router.patch(
  "/editprofile/:id",
  upload.single("image"),
  userController.editProfile
);
// router.patch("/updatefoto", upload.single("image"), userController.updateFoto);
router.get("/avatar/:id", userController.renderAvatar);
router.get("/verify/:token", userController.verify);
router.get("/keeplogin", userController.keeplogin);
router.post("/adminlogin", adminController.login);
router.post("/userlogin", userController.login);
// router.patch("/editpassword", verifyToken, userController.editPassword);
module.exports = router;
