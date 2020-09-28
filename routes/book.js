'use strict';

var express = require('express');
var BookController = require('../controllers/book');
var AuthorBookController = require('../controllers/author-book');

var api = express.Router();

api.get('/books', BookController.getAll);
api.post('/books', BookController.create);
api.get('/books/:book', BookController.getOne);
api.put('/books/:book', BookController.update);
api.delete('/books/:book', BookController.destroy);

api.get('/books/:book/authors', AuthorBookController.getBookAuthors);
api.post('/books/:book/authors', AuthorBookController.addAuthorToBook);
api.delete('/books/:book/authors', AuthorBookController.removeAuthorFromBook);

module.exports = api;
