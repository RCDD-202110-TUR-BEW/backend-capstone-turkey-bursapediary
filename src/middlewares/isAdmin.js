const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const isAdmin = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const loggedUser = jwt.verify(token, SECRET_KEY);
      if (loggedUser.role === 'admin') {
        req.user = loggedUser;
        next();
      } else {
        return res.clearCookie('token').status(403).json({
          error: 'You do not have permissions to perform this action',
        });
      }
    } catch (error) {
      return res
        .clearCookie('token')
        .status(422)
        .json({ error: 'Token expired try to login' });
    }
  }
  return res
    .clearCookie('token')
    .status(401)
    .json({ error: 'Token is not found try to login' });
};

module.exports = {
  isAdmin,
};
