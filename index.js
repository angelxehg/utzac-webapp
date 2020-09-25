'use strict';

const mongoose = require('mongoose');

var app = require('./app');
var port = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost:27017/proyecto', { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to db");
    app.listen(port, () => {
      console.log("Server running at http://localhost:" + port)
    })
  }
});
