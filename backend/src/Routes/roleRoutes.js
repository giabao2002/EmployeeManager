const express = require('express');
const router = express.Router();
const roleService = require('../Services/roleService');
const { verifyAdminHR } = require('../middleware/auth');

router.get('/', verifyAdminHR, roleService.getRoles);
router.post('/', verifyAdminHR, roleService.createRole);
router.put('/:id', verifyAdminHR, roleService.updateRole);
router.delete('/:id', verifyAdminHR, roleService.deleteRole);

module.exports = router;
