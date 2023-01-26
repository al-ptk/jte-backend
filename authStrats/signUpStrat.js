const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

/* Sign Up Strategy
 *
 *
 */
module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, name, done) => {
    console.log(req);
    try {
      const user = await User.create({ email, password, name });
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
