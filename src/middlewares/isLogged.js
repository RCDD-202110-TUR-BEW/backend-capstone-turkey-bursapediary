// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

// verify token cookie middleware
const isLogged = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const loggedUser = jwt.verify(token, SECRET_KEY);
      if (loggedUser) {
        req.user = loggedUser;
        next();
      }
    } catch (error) {
      return res
        .clearCookie('token')
        .status(400)
        .json({ error: 'token expired please login' });
    }
  }

  return res
    .clearCookie('token')
    .status(400)
    .json({ error: 'token not found try to login' });
};

module.exports = {
  isLogged,
};
