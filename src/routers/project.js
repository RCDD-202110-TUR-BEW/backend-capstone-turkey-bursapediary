const express = require("express");
const router = express.Router();

const project = require('../controllers/project')

router.get('/project', project.getAllProjects)
router.get('/project/:id', project.getProjectByID)
router.get('/project/:projectid/comment/', project.getAllComments)
router.get('/project/:projectid/comment/:commentid', project.getCommentByID)
router.get('/project/:projectid/review/', project.getAllReviews)
router.get('/project/:projectid/review/:remiewid', project.getReviewByID)

module.exports = router;
