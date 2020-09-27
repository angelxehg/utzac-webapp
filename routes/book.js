'use strict';

var express = require('express');
var BookController = require('../controllers/book');

var api = express.Router();

api.get('/books', BookController.getAll);
api.post('/books', BookController.create);
api.get('/books/:book', BookController.getOne);
api.put('/books/:book', BookController.update);
api.delete('/books/:book', BookController.destroy);

module.exports = api;
