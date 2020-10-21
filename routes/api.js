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

router.get('/auth/users', auth.logged, users.index);

router.route('/auth/users/:user')
  .get(auth.logged, users.show)
  .put(auth.admin, users.update)
  .delete(auth.admin, users.destroy);

router.route('/authors')
  .get(auth.logged, authors.index)
  .post(auth.admin, authors.store);

router.route('/authors/:author')
  .get(auth.logged, authors.show)
  .put(auth.admin, authors.update)
  .delete(auth.admin, authors.destroy);

router.route('/authors/:author/books')
  .get(auth.logged, authorBooks.indexBooks)
  .post(auth.admin, authorBooks.associate)
  .delete(auth.admin, authorBooks.unlink);

router.route('/books')
  .get(auth.logged, books.index)
  .post(auth.admin, books.store);

router.route('/books/:book')
  .get(auth.logged, books.show)
  .put(auth.admin, books.update)
  .delete(auth.admin, books.destroy);

router.route('/books/:book/authors')
  .get(auth.logged, authorBooks.indexAuthors)
  .post(auth.admin, authorBooks.associate)
  .delete(auth.admin, authorBooks.unlink);

module.exports = router;
