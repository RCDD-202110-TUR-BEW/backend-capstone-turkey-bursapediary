const express = require('express');

const project = require('../controllers/project');

const router = express.Router();

router.put('/:id/support', project.supportProject);
router.get('/:id/supporters', project.getProjectSupporters);
router.post('/:id/reviews', project.createReview);
router.put('/:id/reviews/:reviewId', project.updateReview);
router.delete('/:id/reviews/:reviewId', project.deleteReview);
router.get('/:id/profile', project.getProjectProfile);

module.exports = router;
