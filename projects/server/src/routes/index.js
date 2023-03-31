const userRoute = require("./user")
const adminRoute = require("./admin")
const addressRoute = require("./address")
const productRoute = require("./product")
const rajaOngkirRoute = require("./rajaOngkir")
const cartRoute = require("./cart")
const transactionRoute = require("./transaction")
const voucherDiscountRoute = require("./voucher-discount")

module.exports = {
    adminRoute,
    userRoute,
    productRoute,
    rajaOngkirRoute,
    addressRoute,
    cartRoute,
    transactionRoute,
    voucherDiscountRoute
};
