const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('We doing it live');
});

module.exports = app;
