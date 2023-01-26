const passport = require('passport');

// Import the strategies
const signInStrat = require('./sign-in');
const signUpStrat = require('./sign-up');
const validateJwtStrat = require('./validate-jwt');

// Config the strategies
passport.use('sign-in', signInStrat);
passport.use('sign-up', signUpStrat);
passport.use('validate-jwt', validateJwtStrat);

module.exports = passport;
