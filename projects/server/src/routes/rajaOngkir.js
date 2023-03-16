const express = require("express");
const router = express.Router();
const {rajaOngkirController} = require("../controller")

router.get("/province", rajaOngkirController.getProvince)
router.get("/city/:provId", rajaOngkirController.getCity)
router.post("/cost/:origin/:destination/:weight/:courier", rajaOngkirController.getCost)



module.exports = router