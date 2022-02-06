const express = require('express');

const router = express.Router();

const UserRoutes = require('./user');
const ProjectRoutes = require('./project');

const path = require('path')

router.use('/users', UserRoutes);
router.use('/projects', ProjectRoutes);
router.get('/',function(req,res){
    res.render(path.join(__dirname+'/../views/index.ejs'));
  });


module.exports = router;
