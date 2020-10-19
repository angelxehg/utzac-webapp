'use strict';

const express = require('express');
const router = express.Router();

const AuthorController = require('../controllers/author');
const BookController = require('../controllers/book');
const AuthorBookController = require('../controllers/author-book');

router.get('/authors', AuthorController.getAll);
router.post('/authors', AuthorController.create);
router.get('/authors/:author', AuthorController.getOne);
router.put('/authors/:author', AuthorController.update);
router.delete('/authors/:author', AuthorController.destroy);

router.get('/authors/:author/books', AuthorBookController.getAuthorBooks);
router.post('/authors/:author/books', AuthorBookController.addBookToAuthor);
router.delete('/authors/:author/books', AuthorBookController.removeBookFromAuthor);

router.get('/books', BookController.getAll);
router.post('/books', BookController.create);
router.get('/books/:book', BookController.getOne);
router.put('/books/:book', BookController.update);
router.delete('/books/:book', BookController.destroy);

router.get('/books/:book/authors', AuthorBookController.getBookAuthors);
router.post('/books/:book/authors', AuthorBookController.addAuthorToBook);
router.delete('/books/:book/authors', AuthorBookController.removeAuthorFromBook);

module.exports = router;
