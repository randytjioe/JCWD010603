const express = require("express");
const router = express.Router();

const { userController } = require("../controller");
router.post("/v1", userController.login);
router.post("/v2", userController.register);
router.get("/keeplogin", userController.keeplogin);
module.exports = router;
