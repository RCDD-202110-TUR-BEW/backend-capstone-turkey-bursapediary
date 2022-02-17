const express = require('express');

const router = express.Router();

const project = require('../controllers/project');

router.get('/', project.getAllProjects);
router.get('/:id', project.getProjectByID);
router.get('/:id/comments/', project.getAllComments);
router.get('/:id/comments/:commentId', project.getCommentByID);
router.post('/:id/comments', project.createComment);
router.put('/:id/comments/:commentId', project.updateComment);
router.delete('/:id/comments/:commentId', project.deleteComment);
router.get('/:id/reviews/', project.getAllReviews);
router.get('/:id/reviews/:reviewId', project.getReviewByID);
router.post('/:id/reviews', project.createReview);
router.put('/:id/reviews/:reviewId', project.updateReview);
router.delete('/:id/reviews/:reviewId', project.deleteReview);
router.get('/:id/supporters', project.getProjectSupporters);
router.put('/:id/support', project.supportProject);
router.get('/:id/profile', project.getProjectProfile);
router.post('/index', project.indexProjects);
router.get('/search', project.searchIndex);

module.exports = router;
