const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const {validate, adminValidateRules} = require("../middleware/validator")

router.post('/adminlogin', adminController.login);
router.post('/register_branch_admin', adminValidateRules(), validate, adminController.createAdmin);
router.get('/branches', adminController.getBranches);
router.get('/adminlist', adminController.getAdmin);
router.delete('/deleteAdmin/:id', adminController.deleteAdmin);
router.delete('/deleteBranch/:id', adminController.deleteBranches);
router.post('/create_branch', adminController.createBranches);


module.exports = router;
