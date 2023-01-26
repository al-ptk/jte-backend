const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

module.exports = new JWTstrategy(
  {
    secretOrKey: process.env.JWT_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }
);
