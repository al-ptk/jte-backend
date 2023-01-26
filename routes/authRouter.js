const route = require('express').Router();
const passport = require('../authStrats/configStrategies');
const jwt = require('jsonwebtoken');

// Sign In Route
route.post('/sign-in', async (req, res, next) => {
  // On valid sign-in, send JWT
  passport.authenticate('sign-in', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id, name: user.name };
        const token = jwt.sign({ user: body }, process.env.JWT_KEY);
        return res.json({ body, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Sign Up Route
// route.post('/sign-up', async (req, res, next) => {
//   try {
//     // Get user credentials
//     const { name, email, password } = req.body;
//     // Check if request body is appropriate
//     if (!name || !email || !password) {
//       res.send('Ill formed request body');
//     }
//     // Refuse sign-up if email already registered
//     const userExists = await User.findOne({ email }).exec();
//     if (userExists) {
//       return res.status(401).send('User already exists');
//     }
//     // Create new user
//     const newUser = new User({
//       name,
//       email,
//       password, // the hashing is done in the save pre-hook on the Schema
//     });
//     // Commit new user
//     await newUser.save();
//     res.send('User registered!');
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = route;
