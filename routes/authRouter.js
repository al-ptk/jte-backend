const route = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
      res.cookie('authenticated', 'true');
      res.send(`Welcome back, ${user.name}`);
    } else {
      // TODO add status code
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
      return res.status(401).send('User already exists');
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password, // the hashing is done in the save pre-hook on the Schema
    });

    // Commit new user
    await newUser.save();
    res.send('User registered!');
  } catch (err) {
    return next(err);
  }
});

module.exports = route;
