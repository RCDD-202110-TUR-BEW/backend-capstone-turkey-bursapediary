const Project = require('../models/project');
const User = require('../models/user');

const isApplicableAmount = (amount, collected, requested) => {
  if (requested <= amount - collected) return true;
  return false;
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
      return res.status(422).json({
        message:
          'Your requested amount can not be bigger than the remaining amount for this project',
      });
    }
    const donation = {
      amount: userAmount,
      userID,
      timestamp: new Date().toUTCString(),
    };
    project.donations.push(donation);
    project.supporters.push(userID);
    project.collectedAmount += donation.amount;

    await project.save();
    return res.json(project);
  } catch (error) {
    res.status(422).json({ message: 'Unable to support project' });
  }
  return next();
};

const getProjectSupporters = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    const supporters = [];
    if (!project) res.status(404).json({ message: 'Could not find project' });
    for (let i = 0; i < project.supporters.length; i += 1) {
      const user = User.findById(project.supporters[i]);
      const supporter = {
        name: user.name,
        amount: user.donations.find((donation) => donation.projectID === id)
          .amount,
      };
      supporters.push(supporter);
    }
    return await Promise.all(supporters);
  } catch (error) {
    res.status(422).json({ message: 'Unable to find supporters' });
  }
  return next();
};

module.exports = {
  supportProject,
  getProjectSupporters,
};
