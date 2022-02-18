const express = require('express');

const router = express.Router();

const path = require('path');
const UserRoutes = require('./user');
const ProjectRoutes = require('./project');
const AuthRoutes = require('./auth');

router.use('/users', UserRoutes);
router.use('/projects', ProjectRoutes);
router.get('/', (req, res) => {
  res.render(path.join(`${__dirname}/../views/index.ejs`));
});
router.use('/auth', AuthRoutes);

module.exports = router;
