'use strict';

const express = require('express');
const router = express.Router();

const users = require('../controllers/user');
const authors = require('../controllers/author');
const books = require('../controllers/book');
const authorBooks = require('../controllers/author-book');

const auth = require('../middleware/auth');

router.post('/auth/register', users.register);
router.post('/auth/login', users.login);

router.route('/authors')
  .get(auth.logged, authors.index)
  .post(auth.logged, auth.admin, authors.store);

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
