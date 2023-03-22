const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const { userController } = require("../controller");
router.post("/adminlogin", adminController.login);
router.post("/userlogin", userController.login);
const { validate, userValidateRules } = require("../middleware/validator");

router.post(
  "/register",
  userValidateRules(),
  validate,
  userController.register
);
router.get("/verify/:token", userController.verify);
router.get("/keeplogin", userController.keeplogin);
router.post("/login", userController.login);
module.exports = router;
