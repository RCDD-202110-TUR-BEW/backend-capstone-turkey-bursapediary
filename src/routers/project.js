const express = require('express');

const project = require('../controllers/project');

const router = express.Router();

router.get('/', project.getProjects);
router.put('/:id/support', project.supportProject);
router.get('/:id/supporters', project.getProjectSupporters);
router.post('/:id/comments', project.createComment);
router.put('/:id/comments/:commentId', project.updateComment);
router.delete('/:id/comments/:commentId', project.deleteComment);
router.post('/:id/reviews', project.createReview);
router.put('/:id/reviews/:reviewId', project.updateReview);
router.delete('/:id/reviews/:reviewId', project.deleteReview);
router.get('/:id/profile', project.getProjectProfile);

module.exports = router;
