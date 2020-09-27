'use strict';

var express = require('express');
var BookController = require('../controllers/book');

var api = express.Router();

api.post('/book', BookController.saveBook);

module.exports = api;
