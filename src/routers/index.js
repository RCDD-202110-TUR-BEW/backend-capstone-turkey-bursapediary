const express = require('express');

const router = express.Router();

const path = require('path');
const UserRoutes = require('./user');
const ProjectRoutes = require('./project');

router.use('/users', UserRoutes);
router.use('/projects', ProjectRoutes);
router.get('/', (req, res) => {
  res.render(path.join(`${__dirname}/../views/index.ejs`));
});

module.exports = router;
