// Set up project
require('dotenv').config();
const express = require('express');
const app = express();

// Set up mongoose
require('./mongoose-connection');

// Set up middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Import routers
const authRouter = require('./routes/authRouter');
const projectsRouter = require('./routes/projectsRouter');

// Set up routes
app.get('/', (req, res) => {
  res.send('We doing it live');
});
app.use('/auth', authRouter);
app.use(projectsRouter);

// Set up error handler middleware
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// Export app
module.exports = app;
