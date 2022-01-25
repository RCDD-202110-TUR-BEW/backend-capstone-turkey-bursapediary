const express = require('express');

const router = express.Router();

const UserRoutes = require('./user');
const ProjectRoutes = require('./project');

// router.use('/users', UserRoutes);
// router.use('/projects', ProjectRoutes);

module.export = router;
