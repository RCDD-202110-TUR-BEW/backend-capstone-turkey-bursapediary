/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const Project = require('../models/project');

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    if (!projects) {
      return res.status(404).json({ message: 'Could not find any project' });
    }
    res.json({ projects });
  } catch (err) {
    res.status(422).json({ message: 'Unable to fetch the projects' });
  }
  return next();
};

const getProjectByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Could not find the project' });
    }
    res.json({ project });
  } catch (err) {
    res.status(422).json({ message: 'Unable to fetch the project' });
  }
  return next();
};

const getAllComments = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Could not find the project' });
    }
    res.json({ comments: project.comments });
  } catch (err) {
    res.status(422).json({ message: "Unable to fetch the project's comments" });
  }
  return next();
};

const getCommentByID = async (req, res, next) => {
  const { id, commentid } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Could not find the project' });
    }
    const comment = project.comments.filter((item) => item._id === commentid);
    if (comment.length < 1) {
      return res.status(404).json({
        message:
          'Could not find the comment, either it dose not exist or has been deleted',
      });
    }
    res.json({ comment });
  } catch (err) {
    res.status(422).json({ message: 'Unable to fetch the comment' });
  }
  return next();
};

const getAllReviews = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Could not find the project' });
    }
    res.json({ reviews: project.reviews });
  } catch (err) {
    res.status(422).json({ message: "Unable to fetch the project's reviews" });
  }
  return next();
};

const getReviewByID = async (req, res, next) => {
  const { id, reviewid } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Could not find the project' });
    }
    const review = project.reviews.filter((item) => item._id === reviewid);
    if (review.length < 1) {
      return res.status(404).json({
        message:
          'Could not find the review, either it dose not exist or has been deleted',
      });
    }
    res.json({ review });
  } catch (err) {
    res.status(422).json({ message: 'Unable to fetch the review' });
  }
  return next();
};

module.exports = {
  getAllProjects,
  getProjectByID,
  getAllComments,
  getCommentByID,
  getAllReviews,
  getReviewByID,
};
