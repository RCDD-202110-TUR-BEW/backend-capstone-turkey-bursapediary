const { ObjectId } = require('mongodb');

const Project = require('../models/project');
const User = require('../models/user');

const isApplicableAmount = (amount, collected, requested) =>
  requested <= amount - collected;

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
      return res.status(422).json({
        message:
          'Your requested amount can not be bigger than the remaining amount for this project',
      });
    }
    const projectDonation = {
      amount: userAmount,
      userID,
      timestamp: new Date().toUTCString(),
    };
    project.donations.push(projectDonation);
    project.supporters.push(userID);
    project.collectedAmount += projectDonation.amount;

    const user = await User.findById(userID);

    const userDonation = {
      amount: userAmount,
      // eslint-disable-next-line no-underscore-dangle
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

const getProjectSupporters = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate('supporters');
    const supporters = [];

    if (!project) res.status(404).json({ message: 'Could not find project' });
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

const isEmpty = (field) => !!field;

const updateComment = async (req, res, next) => {
  const { id, commentId } = req.params;
  const { content } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const comment = project.comments.find(
      // eslint-disable-next-line no-underscore-dangle
      (single) => ObjectId(single._id).toString() === commentId
    );

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.content = isEmpty(content) ? content : comment.content;

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

module.exports = {
  supportProject,
  getProjectSupporters,
  createComment,
  updateComment,
};
