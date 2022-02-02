const Project = require('../models/project');

const isApplicableAmount = (amount, collected, requested) => {
  if (requested <= amount - collected) return true;
  return false;
};

const supportProject = async (req, res, next) => {
  const { id } = req.params;
  const { userAmount, userID } = req.body;
  try {
    const project = await Project.findById(id);
    if (!project) res.status(404).json({ message: 'Could not find project' });
    if (
      isApplicableAmount(project.amount, project.collectedAmount, userAmount)
    ) {
      const donation = {
        userAmount,
        userID,
        timestamp: new Date().toUTCString(),
      };
      project.donations.push(donation);
      await project.save();
      res.json(project);
    }
    res.status(422).json({
      message:
        'Your requested amount can not be bigger than the remaining amount for this project',
    });
  } catch (error) {
    res.status(422).json({ message: 'Unable to support project' });
  }
  return next();
};

module.exports = {
  supportProject,
};
