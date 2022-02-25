const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const routes = express.Router();

const { isLogged } = require('../middlewares/isLogged');

require('../auth/passport');

routes.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
);

routes.get('/google/callback', passport.authenticate('google'), (req, res) => {
  const { name, email, providerId, provider, _id, username } = req.user;

  const userInToken = {
    id: _id,
    name,
    email,
    providerId: `${provider}-${providerId}`,
    username,
  };

  const token = jwt.sign(userInToken, process.env.SECRET_KEY, {
    expiresIn: '336h',
  });

  res.cookie('token', token, {
    httpOnly: true,
  });

  res.json({
    message: `Auth successful with Google, Logged in as ${userInToken.username} with id ${userInToken.id} redirecting....`,
    token,
    user: userInToken,
  });
});

routes.get('/me', isLogged, (req, res) => {
  const { name, email, username } = req.user;
  const clientUser = {
    name,
    email,
    username,
  };
  return res.json(clientUser);
});

routes.get('/github', passport.authenticate('github'));

routes.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    const { name, providerId, provider, _id, username } = req.user;

    const userInToken = {
      id: _id,
      name,
      providerId: `${provider}-${providerId}`,
      username,
    };

    const token = jwt.sign(userInToken, process.env.SECRET_KEY, {
      expiresIn: '336h',
    });

    res.cookie('token', token, {
      httpOnly: true,
    });

    res.json({
      message: `Auth successful with Github, Logged in as ${userInToken.username} with id ${userInToken.id} redirecting....`,
      token,
      user: userInToken,
    });
  }
);

module.exports = routes;
