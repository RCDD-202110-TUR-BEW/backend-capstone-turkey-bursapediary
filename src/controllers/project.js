const { ObjectId } = require('mongodb');

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

    res.json({
      message: 'Review created successfully',
      reviews: project.reviews,
    });
  } catch (error) {
    res.status(422).json({ message: 'Unable to create review' });
  }
  return next();
};

const isEmpty = (field) => !!field;

const updateReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const { rating, content } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const review = project.reviews.find(
      // eslint-disable-next-line no-underscore-dangle
      (single) => ObjectId(single._id).toString() === reviewId
    );

    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.rating = isEmpty(rating) ? rating : review.rating;
    review.content = isEmpty(content) ? content : review.content;

    await project.save();

    res.json({
      message: 'Review updated successfully',
      reviews: project.reviews,
    });
  } catch (error) {
    res.status(422).json({ message: 'Unable to update review' });
  }
  return next();
};

const deleteReview = async (req, res, next) => {
  const { id, reviewId } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const reviewIndex = project.reviews.findIndex(
      // eslint-disable-next-line no-underscore-dangle
      (single) => ObjectId(single._id).toString() === reviewId
    );

    if (reviewIndex === -1)
      return res.status(404).json({ message: 'Review not found' });

    project.reviews.splice(reviewIndex, 1);

    await project.save();

    res.json({
      message: 'Review deleted successfully',
      reviews: project.reviews,
    });
  } catch (error) {
    res.status(422).json({ message: 'Unable to update review' });
  }
  return next();
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
