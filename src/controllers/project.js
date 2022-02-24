const { ObjectId } = require('mongodb');
const elastic = require('../elasticsearch');

const Project = require('../models/project');
const User = require('../models/user');

const createProject = async (req, res) => {
  const { title, description, categories, amount, owners } = req.body;

  try {
    const project = new Project({
      title,
      description,
      amount,
    });

    project.owners.push(...owners);
    project.categories.push(...categories);
    await project.save();
    return res.status(201).json('Project created successfully');
  } catch (err) {
    return res.status(422).json('Could not create project');
  }
};

const updateProject = async (req, res) => {
  const { title, description, categories } = req.body;
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.title = title || project.title;
    project.description = description || project.description;

    project.categories.push(...categories);
    await project.save();

    return res.json({
      message: 'Project updated successfully',
    });
  } catch (error) {
    return res.status(422).json({ message: 'Unable to update project' });
  }
};

const doneProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.collectedAmount !== project.amount) {
      return res.status(422).json({
        message: 'This project did not reach the required donation amount yet',
      });
    }

    project.isDone = true;
    await project.save();

    return res.json({
      message: 'This project reached the required donation amount',
    });
  } catch (error) {
    return res.status(422).json({ message: 'Unable to update project' });
  }
};

const removeProject = async (req, res) => {
  try {
    const project = await Project.deleteOne({ _id: req.params.id });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    return res.json({
      message: 'Project removed successfully',
    });
  } catch (error) {
    return res.status(422).json({ message: 'Unable to remove project' });
  }
};

const isApplicableAmount = (amount, collected, requested) =>
  requested <= amount - collected;

const filterProjects = async (req, res) => {
  try {
    const { category } = req.query;
    const projects = await Project.find({ categories: category });
    return res.json(projects);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const isNotEmpty = (field) => !!field;

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    if (!projects) {
      return res.status(404).json({ message: 'Could not find any project' });
    }
    return res.json({ projects });
  } catch (err) {
    return res.status(422).json({ message: 'Unable to fetch the projects' });
  }
};

const getProjectByID = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Could not find the project' });
    }
    return res.json({ project });
  } catch (err) {
    return res.status(422).json({ message: 'Unable to fetch the project' });
  }
};

const getAllComments = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Could not find the project' });
    }
    return res.json({ comments: project.comments });
  } catch (err) {
    return res
      .status(422)
      .json({ message: "Unable to fetch the project's comments" });
  }
};

const getCommentByID = async (req, res) => {
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
    return res.json({ comment });
  } catch (err) {
    return res.status(422).json({ message: 'Unable to fetch the comment' });
  }
};

const createComment = async (req, res) => {
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

    return res.json({
      message: 'Comment created successfully',
      comments: project.comments,
    });
  } catch (error) {
    return res.status(422).json({ message: 'Unable to create comment' });
  }
};

const updateComment = async (req, res) => {
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

    return res.json({
      message: 'Comment updated successfully',
      comments: project.comments,
    });
  } catch (error) {
    return res.status(422).json({ message: 'Unable to update comment' });
  }
};

const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const commentIndex = project.comments.findIndex(
      (single) => ObjectId(single._id).toString() === commentId
    );

    if (commentIndex === -1)
      return res.status(404).json({ message: 'Comment not found' });

    project.comments.splice(commentIndex, 1);

    await project.save();

    return res.json({
      message: 'Comment deleted successfully',
      comments: project.comments,
    });
  } catch (error) {
    return res.status(422).json({ message: 'Unable to update comment' });
  }
};

const getAllReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Could not find the project' });
    }
    return res.json({ reviews: project.reviews });
  } catch (err) {
    return res
      .status(422)
      .json({ message: "Unable to fetch the project's reviews" });
  }
};

const getReviewByID = async (req, res) => {
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
    return res.json({ review });
  } catch (err) {
    return res.status(422).json({ message: 'Unable to fetch the review' });
  }
};

const createReview = async (req, res) => {
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

    return res.json({
      message: 'Review created successfully',
      reviews: project.reviews,
    });
  } catch (error) {
    return res.status(422).json({ message: 'Unable to create review' });
  }
};

const updateReview = async (req, res) => {
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

    return res.json({
      message: 'Review updated successfully',
      reviews: project.reviews,
    });
  } catch (error) {
    return res.status(422).json({ message: 'Unable to update review' });
  }
};

const deleteReview = async (req, res) => {
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

    return res.json({
      message: 'Review deleted successfully',
      reviews: project.reviews,
    });
  } catch (error) {
    return res.status(422).json({ message: 'Unable to update review' });
  }
};

const getProjectSupporters = async (req, res) => {
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
    return res.status(422).json({ message: 'Unable to find supporters' });
  }
};

const supportProject = async (req, res) => {
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
    return res.status(422).json({ message: 'Unable to support project' });
  }
};

const getProjectProfile = async (req, res) => {
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

    return res.json(info);
  } catch (error) {
    return res
      .status(422)
      .json({ message: 'Unable to generate project profile' });
  }
};

const indexProjects = async (req, res) => {
  const projects = await Project.find({});

  if (projects.length < 1)
    return res.json({
      message:
        'Projects not found, create at least one project then try indexing again',
    });

  const projectIndex = projects.map((project) => {
    const { _id, title, description } = project;
    return {
      id: _id,
      title,
      description,
    };
  });

  projectIndex.forEach((project) => {
    const { id, title, description } = project;
    elastic.client
      .index({
        index: 'projects',
        body: {
          id,
          title,
          description,
        },
      })
      .catch((error) =>
        res.status(422).json({
          message: 'Indexing error',
          error,
        })
      );
  });

  return res.json({ message: 'Indexing projects successfully done' });
};

// eslint-disable-next-line consistent-return
const searchIndex = (req, res) => {
  const { text } = req.query;

  if (!text) return res.status(422).json({ message: 'Invalid query' });

  elastic.client
    .search({
      index: 'projects',
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
            projectId: matches[i]._source.id,
            projectTitle: matches[i]._source.title,
            projectDescription: matches[i]._source.description,
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
  createProject,
  updateProject,
  doneProject,
  removeProject,
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
  filterProjects,
  supportProject,
  getProjectProfile,
};
