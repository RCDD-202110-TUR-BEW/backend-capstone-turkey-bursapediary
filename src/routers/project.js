const express = require('express');

const project = require('../controllers/project');

const router = express.Router();

router.put('/:id/support', project.supportProject);
router.get('/:id/supporters', project.getProjectSupporters);
router.post('/:id/comments', project.createComment);
router.put('/:id/comments/:commentId', project.updateComment);
router.delete('/:id/comments/:commentId', project.deleteComment);
router.get('/:id/profile', project.getProjectProfile);

module.exports = router;
