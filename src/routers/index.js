const express = require('express');

const router = express.Router();

const UserRoutes = require('./user');
const ProjectRoutes = require('./project');
const AuthRoutes = require('./auth');

router.use('/users', UserRoutes);
router.use('/projects', ProjectRoutes);
router.use('/auth', AuthRoutes);

module.exports = router;
