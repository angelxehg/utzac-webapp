'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 8000;
const database = process.env.DATABASE_URL || 'mongodb://localhost:27017/utzac-webapp';
const error = require('./helpers/error-handler');

const api = require('./routes/api');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
