const express = require('express');

const router = express.Router();

const project = require('../controllers/project');

router.patch('/:id/support', project.supportProject);
router.get('/:id/supporters', project.getProjectSupporters);

module.exports = router;
