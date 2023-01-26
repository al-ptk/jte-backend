const route = require('express').Router();

// Middleware to authenticate users
route.use((req, res, next) => {
  const isUserAuthenticated = req.cookies['authenticated'] === 'true';
  if (isUserAuthenticated) {
    return next();
  } else {
    return res.sendStatus(401);
  }
});

// Routes for managing projects
route.get('/projects', mockFunction);

route.get('/project/:projectId', mockFunction);

route.put('/project/:projectId', mockFunction);

route.delete('/project/:projectId', mockFunction);

module.exports = route;

function mockFunction(req, res, next) {
  res.send('Hello');
}
