const express = require("express");

const router = express.Router();

const project = require('../controllers/project')

router.get('/', project.getAllProjects)
router.get('/:id', project.getProjectByID)
router.get('/:id/comments/', project.getAllComments)
router.get('/:id/comments/:commentid', project.getCommentByID)
router.get('/:id/reviews/', project.getAllReviews)
router.get('/:id/reviews/:remiewid', project.getReviewByID)

module.exports = router;
