const route = require('express').Router();

route.use((req, res, next) => {
  
})

route.get('/projects', mockFunction);

route.get('/project/:projectId', mockFunction);

route.put('/project/:projectId', mockFunction);

route.delete('/project/:projectId', mockFunction);

module.exports = route;

function mockFunction(req, res, next) {
  res.send(`${req.params.projectId}`);
}