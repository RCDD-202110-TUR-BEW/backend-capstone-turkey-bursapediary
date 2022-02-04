const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('express-jwt');

const User = require('../models/user');
const Project = require('../models/project');

const login = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json(result.errors);
    }
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'wrong username or password' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'wrong username or password' });
    }

    //  14 days in seconds
    const cookieAge = 14 * 24 * 3600;

    const payload = {
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      type: user.type,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: cookieAge,
    });
    res.cookie('_t', token, {
      maxAge: cookieAge * 1000,
      httpOnly: true,
      signed: true,
    });
    return res.json({ token });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const register = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json(result.errors);
    }
    const { username, password, email, name } = req.body;
    const usedUser = await User.findOne({ username });

    if (usedUser) {
      return res.status(400).json({ message: 'username already taken' });
    }
    const passwordHashed = await bcrypt.hash(password, 10);
    const newUser = User.create({
      name,
      username,
      password: passwordHashed,
      email,
    });
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('_t');
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getUserProfile = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const info = {
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      type: user.type,
    };
    const donations = [];

    for (let i = 0; i < user.donations.length; i += 1) {
      const project = Project.findById(user.donations[i].projectID);
      const donation = {
        projectName: project.title,
        donationAmount: user.donations[i].amount,
        donationDate: user.donations[i].timestamp,
      };
      donations.push(donation);
    }
    await Promise.all(donations);
    info.donations = donations;

    res.json(info);
  } catch (error) {
    res.status(422).json({ message: 'Unable to generate user profile' });
  }
  return next();
};

module.exports = {
  login,
  register,
  logout,
  getUserProfile,
};
