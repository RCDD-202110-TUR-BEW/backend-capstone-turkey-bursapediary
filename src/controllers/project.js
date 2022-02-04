const Project = require('../models/project');

const filterProjects = async (req, res) => {
  try {
    const { q } = req.query;
    // the user do not necessarily search for a project by its category
    // try to search in the category is not found try other things
    // do not ever show the user empty or a message says we are sorry we do not have what you are asking :)
    const projects = await Project.find({
      $or: [
        { category: { $elemMatch: { $regex: q } } },
        { title: { $elemMatch: { $regex: q } } },
        { description: { $elemMatch: { $regex: q } } },
      ],
    });
    return res.json(projects);
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = { filterProjects };
