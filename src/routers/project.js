const express = require('express');

const project = require('../controllers/project');

const routes = express.Router();

routes.post('/:id/reviews', project.createReview);
routes.put('/:id/reviews/:reviewId', project.updateReview);
routes.delete('/:id/reviews/:reviewId', project.deleteReview);

module.exports = routes;
