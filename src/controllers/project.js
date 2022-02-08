const Project = require('../models/project');

const filterProjects = async (req, res) => {
  try {
    const { category } = req.query;
    const projects = await Project.find({ 'category.content': category });
    return res.json(projects);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const searchProjects = async (req, res) => {
  try {
    const { search } = req.query;
    // the user do not necessarily search for a project by its category
    // try to search in the category is not found try other things
    // do not ever show the user empty or a message says we are sorry we do not have what you are asking :)
    const projects = await Project.find({
      $or: [
        { category: { $elemMatch: { $regex: search } } },
        { title: { $elemMatch: { $regex: search } } },
        { description: { $elemMatch: { $regex: search } } },
      ],
    });
    return res.json(projects);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { filterProjects, searchProjects };
