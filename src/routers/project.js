const express = require('express');

const project = require('../controllers/project');

const routes = express.Router();

routes.get('/:id/profile', project.getProjectProfile);

module.exports = routes;
