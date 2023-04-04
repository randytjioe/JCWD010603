const express = require("express");
const router = express.Router();
const { cartController } = require("../controller");

router.get("/getcart", cartController.getCartData);
router.delete("/deleteCart/:id", cartController.deleteCartData);
router.post("/addCart", cartController.createCartData);

module.exports = router