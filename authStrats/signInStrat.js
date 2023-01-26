const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

/* Sign In Strategy
 *
 *  Middleware executed on the /sign-in route.
 *  This is meant to retrieve a user's info on sign-in.
 */
module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      /* 
       * This isValidPassword method is defined at the User model file.
       * It is how the program compares passwords.
       * Maybe the comparison should be done within the strategy definition?
       * Co-locating important pieces together seems like a good idea.
       */
      const valid = await user.isValidPassword(password);

      if (!valid) {
        return done(null, false, { message: 'Wrong Password' });
      }

      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      return done(error);
    }
  }
);
