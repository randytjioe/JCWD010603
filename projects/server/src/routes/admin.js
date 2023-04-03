const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");

const { validate, adminValidateRules } = require("../middleware/validator");
const { verifyAdmin, checkAdminRole } = require("../middleware/adminAuth");

router.post("/adminlogin", adminController.login);
router.post(
  "/register_branch_admin",
  verifyAdmin,
  checkAdminRole,
  adminController.createAdmin
);
router.get("/branches", adminController.getBranches);
router.get("/adminlist", adminController.getAdmin);
router.delete("/deleteAdmin/:id", adminController.deleteAdmin);
router.delete("/deleteBranch/:id", adminController.deleteBranches);
router.post(
  "/create_branch",
  verifyAdmin,
  checkAdminRole,
  adminController.createBranches
);
router.post("/create_category", adminController.createCategory);
router.get("/categories", adminController.getCategory);
router.patch("/update_category/:id", adminController.updateCategory);
router.delete("/delete_category/:id", adminController.deleteCategory);
router.patch("/update_stock/:id", adminController.updateStock);
router.post("/addvouchertype", adminController.createVoucherType);
router.get("/vouchertype", adminController.getVoucherType);
router.delete("/deletevouchertype/:id", adminController.deleteVoucherType);
router.post("/addvoucher", adminController.createVoucher);

module.exports = router;
