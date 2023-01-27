const route = require('express').Router();
const passport = require('../authStrats/configStrategies');

// Middleware to authenticate users
// route.use(passport.authenticate('validate-jwt', { session: false }));
route.use(passport.authenticate('validate-jwt', { session: false }));

// Routes for managing projects
route.get('/projects', mockFunction);

route.get('/project/:projectId', mockFunction);

route.put('/project/:projectId', mockFunction);

route.delete('/project/:projectId', mockFunction);

module.exports = route;

function mockFunction(req, res, next) {
  res.send('Hello');
}
