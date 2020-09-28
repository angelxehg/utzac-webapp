'use strict';

var express = require('express');
var AuthorController = require('../controllers/author');
var AuthorBookController = require('../controllers/author-book');

var api = express.Router();

api.get('/authors', AuthorController.getAll);
api.post('/authors', AuthorController.create);
api.get('/authors/:author', AuthorController.getOne);
api.put('/authors/:author', AuthorController.update);
api.delete('/authors/:author', AuthorController.destroy);

api.get('/authors/:author/books', AuthorBookController.getAuthorBooks);
api.post('/authors/:author/books', AuthorBookController.addBookToAuthor);
api.delete('/authors/:author/books', AuthorBookController.removeBookFromAuthor);

module.exports = api;
