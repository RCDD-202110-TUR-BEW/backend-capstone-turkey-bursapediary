const express = require('express');
const { isLogged } = require('../middlewares/isLogged');

const router = express.Router();

const project = require('../controllers/project');

router.get('/', project.getAllProjects);
router.get('/filter', project.filterProjects);
router.get('/search', project.searchIndex);
router.post('/', isLogged, project.createProject);
router.put('/:id', isLogged, project.updateProject);
router.put('/:id/finish', isLogged, project.doneProject);
router.delete('/:id', isLogged, project.removeProject);
router.get('/:id', project.getProjectByID);
router.get('/:id/comments/', project.getAllComments);
router.get('/:id/comments/:commentId', project.getCommentByID);
router.post('/:id/comments', isLogged, project.createComment);
router.put('/:id/comments/:commentId', isLogged, project.updateComment);
router.delete('/:id/comments/:commentId', isLogged, project.deleteComment);
router.get('/:id/reviews/', project.getAllReviews);
router.get('/:id/reviews/:reviewId', project.getReviewByID);
router.post('/:id/reviews', isLogged, project.createReview);
router.put('/:id/reviews/:reviewId', isLogged, project.updateReview);
router.delete('/:id/reviews/:reviewId', isLogged, project.deleteReview);
router.get('/:id/supporters', isLogged, project.getProjectSupporters);
router.put('/:id/support', isLogged, project.supportProject);
router.get('/:id/profile', isLogged, project.getProjectProfile);
router.post('/index', isLogged, project.indexProjects);

module.exports = router;
