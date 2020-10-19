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

router.get('/authors/:author/books', authorBooks.getAuthorBooks);
router.post('/authors/:author/books', authorBooks.addBookToAuthor);
router.delete('/authors/:author/books', authorBooks.removeBookFromAuthor);

router.get('/books', books.index);
router.post('/books', books.store);
router.get('/books/:book', books.show);
router.put('/books/:book', books.update);
router.delete('/books/:book', books.destroy);

router.get('/books/:book/authors', authorBooks.getBookAuthors);
router.post('/books/:book/authors', authorBooks.addAuthorToBook);
router.delete('/books/:book/authors', authorBooks.removeAuthorFromBook);

module.exports = router;
