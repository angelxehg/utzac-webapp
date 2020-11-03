'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 8000;
const database = process.env.DATABASE_URL || 'mongodb://localhost:27017/utzac-webapp';
const error = require('./helpers/error-handler');

const api = require('./routes/api');
const web = require('./routes/web');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('web'));
app.use('/api', api);

app.use(error.handle);

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, db) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
});
