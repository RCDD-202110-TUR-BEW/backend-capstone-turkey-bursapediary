const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const isLogged = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;

  try {
    const loggedUser = jwt.verify(token, SECRET_KEY);
    if (loggedUser) {
      req.user = loggedUser;
    }
  } catch (error) {
    return res
      .clearCookie('token')
      .status(422)
      .json({ error: 'Invalid / Expired token, try to login' });
  }

  return next();
};

module.exports = {
  isLogged,
};
