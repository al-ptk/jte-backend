const route = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const SALT = 10;

const error = async () => {
  throw new Error('outside try block');
};

// Sign In Route
route.post('/sign-in', async (req, res, next) => {
  try {
    // Get login credentials
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    // Reject emails not registered
    if (!user) {
      // TODO add status code
      return res.send('Wrong password or email.');
    }

    // Authenticate user
    const userAuthenticated = await bcrypt.compare(password, user.password);
    if (userAuthenticated) {
      res.send(`Welcome back, ${user.name}`);
    } else {
      res.send('Wrong password or email.');
    }
  } catch (err) {
    return next(err);
  }
});

// Sign Up Route
route.post('/sign-up', async (req, res, next) => {
  try {
    // Get user credentials
    const { name, email, password } = req.body;

    // Check if request body is appropriate
    if (!name || !email || !password) {
      res.send('Ill formed request body');
    }

    // Refuse sign-up if email already registered
    const userExists = await User.findOne({ email }).exec();
    if (userExists) {
      // TODO add status code
      return res.status(401).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Commit new user
    await newUser.save();
    res.send('User registered!');
  } catch (err) {
    return next(err);
  }
});

module.exports = route;
