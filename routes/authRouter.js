const route = require('express').Router();
const User = require('../models/User');

route.post('/sign-in', (req, res) => {
  const { email, password } = req.body;

  // Reject emails not registered
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      // TODO add status code
      return res.send('No user registered with this email');
    }

    res.send(`Welcome back, ${user.name}`);
  });
});

route.post('/sign-up', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if request body is appropriate
  if (!name || !email || !password) {
    res.send('Ill formed request body');
  }

  // Refuse sign-up if email already registered
  const userExists = await User.findOne({ email }).exec();
  if (userExists) {
    // TODO add status code
    return res.send('User already exists');
  }

  // Create new user
  const newUser = new User({
    name,
    email,
    password,
  });

  // Commit new user
  try {
    await newUser.save();
    res.send('User registered!');
  } catch (err) {
    return next(err);
  }
});

module.exports = route;
