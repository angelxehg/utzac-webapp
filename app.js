'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;
const dbUrl = 'mongodb://localhost:27017/proyecto';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var authors = require('./routes/author');
var books = require('./routes/book');

app.get('/', (req, res) => {
  res.send({
    message: 'Hello world',
  });
});

app.use('/api', authors);
app.use('/api', books);

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
});
