const route = require('express').Router();
const passport = require('../authStrats/configStrategies');
const projectControler = require('../controllers/projectControllers');

// Middleware to authenticate users
route.use(passport.authenticate('validate-jwt', { session: false }));

// Routes for managing projects
route.get('/projects', projectControler.getAllTables);

route.post('/projects', projectControler.newTable);

route.get('/project/:projectId', projectControler.getTable);

route.put('/project/:projectId', projectControler.setTable);

route.delete('/project/:projectId', projectControler.deleteTable);

module.exports = route;
