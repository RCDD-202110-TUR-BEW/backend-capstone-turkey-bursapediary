const express = require('express');
const { check } = require('express-validator');
const UserController = require('../controllers/user');
const { isLogged } = require('../middlewares/isLogged');

const routes = express.Router();

routes.post(
  '/login',
  check('username', 'Username must be at least 4 characters long')
    .notEmpty()
    .withMessage('Username should not be empty')
    .bail()
    .isLength({ min: 4 })
    .bail(),
  check('password', 'Password must be at least 5 characters long')
    .notEmpty()
    .withMessage('Password should not be empty')
    .bail()
    .isLength({ min: 5 })
    .bail(),
  UserController.login
);

routes.post(
  '/register',
  check('username', 'Username must be at least 4 characters long')
    .notEmpty()
    .withMessage('Username should not be empty')
    .bail()
    .isLength({ min: 4 })
    .bail()
    .not()
    .matches(/\s/)
    .withMessage('Username should not include spaces')
    .bail(),
  check('email', 'Invalid email')
    .notEmpty()
    .withMessage('Email should not be empty')
    .bail()
    .isEmail()
    .normalizeEmail()
    .bail(),
  check('password', 'Password must be at least 5 characters long')
    .notEmpty()
    .withMessage('Password should not be empty')
    .bail()
    .isLength({ min: 5 })
    .bail()
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage('Password must contain a number, uppercase and lowercase')
    .bail()
    .custom((val, { req }) => val === req.body.confirmPassword)
    .withMessage('Passwords are not matching')
    .bail(),
  UserController.register
);

routes.post('/logout', UserController.logout);
routes.get('/:id', isLogged, UserController.getUserProfileById);
routes.get('/:username', isLogged, UserController.getUserProfile);
routes.put('/:id', isLogged, UserController.updateUser);
routes.delete('/:id', isLogged, UserController.deleteUser);

module.exports = routes;
