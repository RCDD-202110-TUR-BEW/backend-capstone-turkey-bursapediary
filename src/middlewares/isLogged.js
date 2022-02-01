const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

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
  isLogged,
};
