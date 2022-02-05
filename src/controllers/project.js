const Project = require('../models/project');

const createReview = async (req, res, next) => {
  const { id } = req.params;
  const { userID, rating, content } = req.body;

  try {
    const project = await Project.findOne({ _id: id });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const review = {
      user: userID,
      rating,
      content,
    };

    project.reviews.push(review);
    await project.save();
    res.json(project.reviews);
  } catch (error) {
    res.status(422).json({ message: 'Unable to create review' });
  }
  return next();
};

module.exports = {
  createReview,
};
