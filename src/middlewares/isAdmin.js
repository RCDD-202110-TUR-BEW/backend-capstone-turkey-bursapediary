const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const isAdmin = (req, res, next) => {
  const { token } = req.cookies;

  const loggedUser = jwt.verify(token, SECRET_KEY);

  if (loggedUser.role === 'admin') {
    next();
  }

  return res.clearCookie('token').status(403).json({
    error: 'You do not have permissions to perform this action',
  });
};

module.exports = {
  isAdmin,
};
