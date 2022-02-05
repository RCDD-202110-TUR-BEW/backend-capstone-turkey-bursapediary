const express = require('express');

const router = express.Router();

const project = require('../controllers/project');

router.put('/:id/support', project.supportProject);
router.get('/:id/supporters', project.getProjectSupporters);
router.get('/:id/profile', project.getProjectProfile);

module.exports = router;
