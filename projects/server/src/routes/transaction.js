const express = require("express");
const router = express.Router();
const { transactionController } = require("../controller");

router.get(
  "/counttransactionbybranch/:id",
  transactionController.getCountTransactionByBranch
);
router.get(
  "/getIncomeTransactionByBranch/:id",
  transactionController.getIncomeTransactionByBranch
);
router.get("/transaction-header", transactionController.getData);
router.get(
  "/transaction-detail/:id",
  transactionController.getTransactionDetail
);
// router.patch(
//   "/uploadfoto/:id",
//   fileUploader({
//     destinationFolder: "IMAGE_PRODUCT",
//     fileType: "image",
//     prefix: "POST",
//   }).single("image"),
//   transactionController.uploadFoto
// );
module.exports = router;
