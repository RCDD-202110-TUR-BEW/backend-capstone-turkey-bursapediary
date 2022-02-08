/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALL_BACK_URL,
    },
    async (accessToken, refreshToken, profile, callBack) => {
      const user = await User.findOne({ providerId: profile.id });

      if (user) {
        callBack(null, user);
      } else {
        const newUser = new User({
          email: profile._json.email,
          name: profile.displayName,
          providerId: profile.id,
          provider: profile.provider,
          password: 'use-your-account-login',
          username: profile.displayName.split(' ').join('').toLowerCase(),
        });

        newUser.save();
        callBack(null, newUser);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALL_BACK_URL,
    },
    async (accessToken, refreshToken, profile, callBack) => {
      const user = await User.findOne({ providerId: profile.id });

      if (user) {
        callBack(null, user);
      } else {
        const newUser = new User({
          email: 'same-as-your-github-email',
          name: profile.displayName,
          providerId: profile.id,
          provider: profile.provider,
          password: 'use-your-account-login',
          username: profile.username,
        });

        newUser.save();
        callBack(null, newUser);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
