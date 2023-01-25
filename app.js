// Set up project 
require('dotenv').config();
const express = require('express');
const app = express();

// Set up mongoose
require('./mongoose-connection')

// Set up routes
app.get('/', (req, res) => {
  res.send('We doing it live');
});

// Export app
module.exports = app;
