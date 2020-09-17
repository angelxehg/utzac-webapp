'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.status(200).send({
    message: "Aquí va la documentación de mi API"
  });
});

app.get('/test', function (req, res) {
  res.status(200).send({
    message: "Hola mundo!"
  });
});

module.exports = app;
