const passport = require('passport');

// Import the strategies
const signInStrat = require('./signInStrat');
const validateJwtStrat = require('./validateJwtStrat');

// Config the strategies
passport.use('sign-in', signInStrat);
passport.use('validate-jwt', validateJwtStrat);

module.exports = passport;
