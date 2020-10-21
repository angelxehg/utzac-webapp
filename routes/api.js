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
  .get(auth.logged, authors.show)
  .put(auth.logged, auth.admin, authors.update)
  .delete(auth.logged, auth.admin, authors.destroy);

router.route('/authors/:author/books')
  .get(auth.logged, authorBooks.indexBooks)
  .post(auth.logged, auth.admin, authorBooks.associate)
  .delete(auth.logged, auth.admin, authorBooks.unlink);

router.route('/books')
  .get(auth.logged, books.index)
  .post(auth.logged, auth.admin, books.store);

router.route('/books/:book')
  .get(auth.logged, books.show)
  .put(auth.logged, auth.admin, books.update)
  .delete(auth.logged, auth.admin, books.destroy);

router.route('/books/:book/authors')
  .get(auth.logged, authorBooks.indexAuthors)
  .post(auth.logged, auth.admin, authorBooks.associate)
  .delete(auth.logged, auth.admin, authorBooks.unlink);

module.exports = router;
