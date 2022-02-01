/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const Project = require('../models/project');

const getAllProjects = async (req, res, next) => {
  const projects = await Project.find({});
  try {
    if (!projects) {
      const error = new Error('Could not find any Project.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ projects });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getProjectByID = async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  try {
    if (!project) {
      const error = new Error('Could not find Project.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ project });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getAllComments = async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  try {
    if (!project) {
      const error = new Error('Could not find Project.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ comments: project.comments });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getCommentByID = async (req, res, next) => {
  const { id, commentid } = req.params;
  const project = await Project.findById(id);
  try {
    if (!project) {
      const error = new Error('Could not find Project.');
      error.statusCode = 404;
      throw error;
    }
    //
    const comment = project.comments.filter((item) => item._id === commentid);
    if (comment.length < 1) {
      const error = new Error('Could not find Comment.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ comment });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getAllReviews = async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  try {
    if (!project) {
      const error = new Error('Could not find Project.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ reviews: project.reviews });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getReviewByID = async (req, res, next) => {
  const { id, reviewid } = req.params;
  const project = await Project.findById(id);
  try {
    if (!project) {
      const error = new Error('Could not find Project.');
      error.statusCode = 404;
      throw error;
    }
    //
    const review = project.reviews.filter((item) => item._id === reviewid);
    if (review.length < 1) {
      const error = new Error('Could not find Review.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ review });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getAllProjects,
  getProjectByID,
  getAllComments,
  getCommentByID,
  getAllReviews,
  getReviewByID,
};
