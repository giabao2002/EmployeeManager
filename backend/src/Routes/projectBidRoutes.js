const express = require('express');
const router = express.Router();
const projectBidService = require('../Services/projectBidService');
const { verifyAdmin } = require('../middleware/auth');

router.get('/', verifyAdmin, projectBidService.getAllProjects);
router.post('/', verifyAdmin, projectBidService.createProject);
router.put('/:id', verifyAdmin, projectBidService.updateProject);
router.delete('/:id', verifyAdmin, projectBidService.deleteProject);

module.exports = router;
