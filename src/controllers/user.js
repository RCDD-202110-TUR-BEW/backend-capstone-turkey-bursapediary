const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('express-jwt');

const User = require('../models/user');

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

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: '404 Not found' });
    }
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      returnOriginal: false,
    });
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete(id);
    if (!user) {
      res.status(404).json({ message: '404 Not found' });
    } else {
      res.status(204).json({ message: 'user deleted' });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = {
  login,
  register,
  logout,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
