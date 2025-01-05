const express = require('express');
const router = express.Router();
const departmentService = require('../Services/departmentService');
const { verifyAdminHR } = require('../middleware/auth');

router.get('/', verifyAdminHR, departmentService.getDepartments);
router.post('/', verifyAdminHR, departmentService.createDepartment);
router.put('/:id', verifyAdminHR, departmentService.updateDepartment);
router.delete('/:id', verifyAdminHR, departmentService.deleteDepartment);

module.exports = router;
