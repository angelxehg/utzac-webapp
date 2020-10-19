'use strict';

const express = require('express');
const router = express.Router();

const authors = require('../controllers/author');
const books = require('../controllers/book');
const authorBooks = require('../controllers/author-book');

router.get('/authors', authors.index);
router.post('/authors', authors.store);
router.get('/authors/:author', authors.show);
router.put('/authors/:author', authors.update);
router.delete('/authors/:author', authors.destroy);

router.get('/authors/:author/books', authorBooks.indexBooks);
router.post('/authors/:author/books/:book', authorBooks.associate);
router.delete('/authors/:author/books/:book', authorBooks.unlink);

router.get('/books', books.index);
router.post('/books', books.store);
router.get('/books/:book', books.show);
router.put('/books/:book', books.update);
router.delete('/books/:book', books.destroy);

router.get('/books/:book/authors', authorBooks.indexAuthors);
router.post('/books/:book/authors/:author', authorBooks.associate);
router.delete('/books/:book/authors/:author', authorBooks.unlink);

module.exports = router;
