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
      return res.status(400).json({ message: 'wrong user name or passowrd' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'wrong user name or passowrd' });
    }

    const payload = {
      usernam: user.usernam,
      email: user.email,
      name: user.name,
      role: user.role,
      type: user.type,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 60 * 2,
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

module.exports = { login, register };
