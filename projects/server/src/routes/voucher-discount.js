const express = require("express");
const router = express.Router();
const { voucherDiscountController } = require("../controller");

router.post("/addvouchertype", voucherDiscountController.createVoucherType);
router.get("/vouchertype", voucherDiscountController.getVoucherType);
router.delete("/deletevouchertype/:id", voucherDiscountController.deleteVoucherType);
router.post("/addvoucher", voucherDiscountController.createVoucher);

module.exports = router