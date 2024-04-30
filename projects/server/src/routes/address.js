const express = require("express");
const router = express.Router();
const { addressController } = require("../controller");
router.get("/addresses", addressController.getAddress);

router.get("/editdetailaddress/:id", addressController.getAddressById);
router.get("/listaddress/:UserId", addressController.getListAddressByUserId);
router.delete("/delete-address", addressController.deleteAddress);
router.get("/update-address/:id", addressController.getAddressById);
router.get("/primaryaddress/:id", addressController.getAddressByisPrimary);
router.patch("/editaddress", addressController.updateAddress);
router.post("/addaddress", addressController.addAddress);
router.get("/address-branches/:id", addressController.getAddressBranches);
module.exports = router;
