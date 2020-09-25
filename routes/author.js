'use strict';

var express = require('express');
var AuthorController = require('../controllers/author');

var api = express.Router();

api.post('/author', AuthorController.saveAuthor);

module.exports = api;
