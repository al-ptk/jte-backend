const route = require('express').Router();
const passport = require('../authStrats/configStrategies');
const projectControler = require('../controllers/projectControllers');

// Middleware to authenticate users
route.use(passport.authenticate('validate-jwt', { session: false }));

// Routes for managing projects

// Takes no type of parameters
route.get('/projects', projectControler.getAllTables);

// Takes a table field in the req.body
route.post('/projects', projectControler.newTable);

// Takes only the projectId param
route.get('/project/:projectId', projectControler.getTable);

// Takes the projectId param and an updated table in the req.body
route.put('/project/:projectId', projectControler.setTable);

// Takes only the projectId param
route.delete('/project/:projectId', projectControler.deleteTable);

module.exports = route;
