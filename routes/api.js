'use strict';

const express = require('express');
const router = express.Router();

const authors = require('../controllers/author');
const books = require('../controllers/book');
const authorBooks = require('../controllers/author-book');

router.route('/authors')
  .get(authors.index)
  .post(authors.store);

router.route('/authors/:author')
  .get(authors.show)
  .post(authors.update)
  .delete(authors.destroy);

router.route('/authors/:author/books')
  .get(authorBooks.indexBooks)
  .post(authorBooks.associate)
  .delete(authorBooks.unlink);

router.route('/books')
  .get(books.index)
  .post(books.store);

router.route('/books/:book')
  .get(books.show)
  .post(books.update)
  .delete(books.destroy);

router.route('/books/:book/authors')
  .get(authorBooks.indexAuthors)
  .post(authorBooks.associate)
  .delete(authorBooks.unlink);

module.exports = router;
