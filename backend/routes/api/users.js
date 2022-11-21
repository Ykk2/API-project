const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { email, password, username, firstName, lastName } = req.body;

      const emailExists = await User.findOne({
        where: {email: email}
      })

      const userNameExists = await User.findOne({
        where: {username: username}
      })

      const err = {message: ["Validation Error"], errors: []}


      if (!email || !username || !firstName || !lastName || emailExists || userNameExists ||
        firstName.toUpperCase() === firstName.toLowerCase() || lastName.toUpperCase() === lastName.toLowerCase()) {
        if (!email) {
          err.errors.push("Invalid email")
        }
        if (!username) {
          err.errors.push("Username is required")
        }
        if (!firstName) {
          err.errors.push("First Name is required")
        }
        if (!lastName) {
          err.errors.push("Last Name is required")
        }
        if (firstName.toUpperCase() === firstName.toLowerCase()) {
          err.errors.push("Sorry, First Name cannot be numbers")
        }
        if (lastName.toUpperCase() === lastName.toLowerCase()) {
          err.errors.push("Sorry, Last Name cannot be numbers")
        }
        if (emailExists) {
          err.errors.push("User with that email already exists")
        }
        if (userNameExists) {
          err.errors.push("User with that username already exists")
        }

        err.status = 400
        console.log(err)
        return next(err)
      }

      const user = await User.signup({ email, username, password, firstName, lastName });

      const token = setTokenCookie(res, user);

      return res.json({
        user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        token: token
      }
    });
    }
  );
module.exports = router;
