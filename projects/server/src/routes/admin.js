const express = require("express");
const adminController = require("../controller/admin");
const router = express.Router();
const {validate, adminValidateRules} = require("../middleware/validator")

router.post('/adminlogin', adminController.login);
router.post('/register_branch_admin', adminValidateRules(), validate, adminController.createAdmin);
router.get('/branches', adminController.getBranches);
router.get('/adminlist', adminController.getAdmin);
router.delete('/deleteAdmin/:id', adminController.deleteAdmin);
router.delete('/deleteBranch/:id', adminController.deleteBranches);
router.post('/create_branch', adminController.createBranches);
router.post('/create_category', adminController.createCategory);
router.get('/categories', adminController.getCategory);
router.patch('/update_category/:id', adminController.updateCategory);
router.delete('/delete_category/:id', adminController.deleteCategory);
router.patch('/update_stock/:id', adminController.updateStock);


module.exports = router;
