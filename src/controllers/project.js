/* eslint-disable no-underscore-dangle */
const { ObjectId } = require('mongodb');
const elasticsearch = require('elasticsearch');

const Project = require('../models/project');
const User = require('../models/user');

const isApplicableAmount = (amount, collected, requested) =>
  requested <= amount - collected;

const isNotEmpty = (field) => !!field;

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
  const { id, commentId } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Could not find the project' });
    }
    const comment = project.comments.filter((item) => item._id === commentId);
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

const createComment = async (req, res, next) => {
  const { id } = req.params;
  const { userID, content } = req.body;

  try {
    const project = await Project.findOne({ _id: id });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const comment = {
      user: userID,
      content,
    };

    project.comments.push(comment);

    await project.save();

    res.json({
      message: 'Comment created successfully',
      comments: project.comments,
    });
  } catch (error) {
    res.status(422).json({ message: 'Unable to create comment' });
  }
  return next();
};

const updateComment = async (req, res, next) => {
  const { id, commentId } = req.params;
  const { content } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const comment = project.comments.find(
      (single) => ObjectId(single._id).toString() === commentId
    );

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.content = isNotEmpty(content) ? content : comment.content;

    await project.save();

    res.json({
      message: 'Comment updated successfully',
      comments: project.comments,
    });
  } catch (error) {
    res.status(422).json({ message: 'Unable to update comment' });
  }
  return next();
};

const deleteComment = async (req, res, next) => {
  const { id, commentId } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const commentIndex = project.comments.findIndex(
      // eslint-disable-next-line no-underscore-dangle
      (single) => ObjectId(single._id).toString() === commentId
    );

    if (commentIndex === -1)
      return res.status(404).json({ message: 'Comment not found' });

    project.comments.splice(commentIndex, 1);

    await project.save();

    res.json({
      message: 'Comment deleted successfully',
      comments: project.comments,
    });
  } catch (error) {
    res.status(422).json({ message: 'Unable to update comment' });
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
  const { id, reviewId } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Could not find the project' });
    }
    const review = project.reviews.filter((item) => item._id === reviewId);
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

const createReview = async (req, res, next) => {
  const { id } = req.params;
  const { userID, rating, content } = req.body;

  try {
    const project = await Project.findOne({ _id: id });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const reviewExist = project.reviews.find(
      (review) => ObjectId(review.user).toString() === userID
    );

    if (reviewExist) {
      return res
        .status(422)
        .json({ message: 'You already reviewed this project' });
    }

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

const updateReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const { rating, content } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const review = project.reviews.find(
      (single) => ObjectId(single._id).toString() === reviewId
    );

    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.rating = isNotEmpty(rating) ? rating : review.rating;
    review.content = isNotEmpty(content) ? content : review.content;

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
      (single) => ObjectId(single._id).toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

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

const getProjectSupporters = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate('supporters');
    const supporters = [];

    if (!project)
      return res.status(404).json({ message: 'Could not find project' });

    project.supporters.forEach((supporter) => {
      const single = {
        name: supporter.name,
        amount: supporter.donations.find(
          (donation) => donation.projectID === id
        ).amount,
      };
      supporters.push(single);
    });

    return await Promise.all(supporters);
  } catch (error) {
    res.status(422).json({ message: 'Unable to find supporters' });
  }
  return next();
};

const supportProject = async (req, res, next) => {
  const { id } = req.params;
  const { userAmount, userID } = req.body;
  try {
    const project = await Project.findById(id);
    if (!project)
      return res.status(404).json({ message: 'Could not find project' });
    if (
      !isApplicableAmount(project.amount, project.collectedAmount, userAmount)
    ) {
      if (project.amount - project.collectedAmount === 0)
        return res.status(422).json({
          message:
            'This project is done with funding, thank you for your interest',
        });
      return res.status(422).json({
        message: `Your requested amount can not be bigger than the ${
          project.amount - project.collectedAmount
        } remaining amount for this project`,
      });
    }
    const projectDonation = {
      amount: userAmount,
      userID,
      timestamp: new Date().toUTCString(),
    };
    project.donations.push(projectDonation);

    if (
      !project.supporters.find(
        (supporterId) => ObjectId(supporterId).toString() === userID
      )
    ) {
      project.supporters.push(userID);
    }

    project.collectedAmount += projectDonation.amount;

    const user = await User.findById(userID);

    const userDonation = {
      amount: userAmount,
      projectID: project._id,
      timestamp: projectDonation.timestamp,
    };
    user.donations.push(userDonation);
    await project.save();
    await user.save();
    return res.json(project);
  } catch (error) {
    res.status(422).json({ message: 'Unable to support project' });
  }
  return next();
};

const getProjectProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await Project.findOne({ _id: id })
      .populate({
        path: 'owners',
      })
      .populate({
        path: 'supporters',
      })
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          model: 'users',
        },
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'users',
        },
      })
      .populate({
        path: 'donations',
        populate: {
          path: 'userID',
          model: 'users',
        },
      });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const owners = [];

    project.owners.forEach((owner) => {
      const single = {
        username: owner.username,
      };
      owners.push(single);
    });

    const reviews = [];

    project.reviews.forEach(async (review) => {
      const single = {
        username: review.user?.username,
        rating: review.rating,
        content: review.content,
        date: review.createdAt,
      };
      reviews.push(single);
    });

    const comments = [];

    project.comments.forEach(async (comment) => {
      const single = {
        username: comment.user?.username,
        content: comment.content,
        date: comment.createdAt,
      };
      comments.push(single);
    });

    const supporters = [];

    project.supporters.forEach((supporter) => {
      const single = {
        username: supporter.username,
      };
      supporters.push(single);
    });

    const donations = [];

    project.donations.forEach((donation) => {
      const single = {
        donator: donation.userID.username,
        donationAmount: donation.amount,
        donationDate: donation.timestamp,
      };
      donations.push(single);
    });

    const info = {
      title: project.title,
      description: project.description,
      donationsNeeded: project.amount,
      donationsCollected: project.collectedAmount,
      isDone: project.isDone,
      isExpired: project.isExpired,
      owners,
      reviews,
      comments,
      supporters,
      donations,
    };

    res.json(info);
  } catch (error) {
    res.status(422).json({ message: 'Unable to generate project profile' });
  }
  return next();
};

const client = elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URL,
});

const indexProjects = async (req, res) => {
  const projects = await Project.find({});
  const responses = [];
  const exceptions = [];

  await Promise.all([
    projects.forEach((project) => {
      try {
        client.index({
          index: 'new_projects',
          type: 'project',
          body: {
            id: project._id,
            title: project.title,
            description: project.description,
          },
        });

        responses.push({
          message: `Indexing project with id ${project._id} is successful`,
        });
      } catch (error) {
        exceptions.push({
          message: `Indexing error for project with id ${project._id}`,
          error,
        });
      }
    }),
  ]);

  res.json({ responses, exceptions });
};

const searchIndex = (req, res) => {
  const { text } = req.query;

  client
    .search({
      index: 'new_projects',
      body: {
        query: {
          multi_match: {
            query: text.trim(),
            fields: ['title', 'description'],
          },
        },
      },
    })
    .then((response) => {
      const matches = response.hits.hits;
      const results = [];

      if (matches.length > 0) {
        for (let i = 0; i < matches.length; i += 1) {
          results.push({
            id: matches[i]._source.id,
            title: matches[i]._source.title,
            description: matches[i]._source.description,
            score: matches[i]._score,
          });
        }
        return res.json(results);
      }
      return res.json({ message: 'No matches found' });
    })
    .catch(() => res.status(500).json({ message: 'Searching match error' }));
};

module.exports = {
  getAllProjects,
  getProjectByID,
  getAllComments,
  getCommentByID,
  createComment,
  updateComment,
  deleteComment,
  getAllReviews,
  getReviewByID,
  createReview,
  updateReview,
  deleteReview,
  getProjectSupporters,
  indexProjects,
  searchIndex,
  supportProject,
  getProjectProfile,
};
