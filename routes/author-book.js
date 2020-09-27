'use strict';

var express = require('express');
var AuthorBookController = require('../controllers/author-book');

var api = express.Router();

api.post('/author-book', AuthorBookController.saveAuthorBook);

module.exports = api;
