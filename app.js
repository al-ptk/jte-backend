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

// Set up routes
app.get('/', (req, res) => {
  res.send('We doing it live');
});
app.use('/auth', authRouter);

// Export app
module.exports = app;
