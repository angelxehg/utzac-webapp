'use strict';

const AuthorBook = require('../models/author-book');
const error = require('../helpers/error-handler');

const indexBooks = (req, res, next) => {
  const author = req.params.author;
  return AuthorBook.find({ author: author }).populate('book')
    .then(books => res.send(books))
    .catch(err => next(error.mongodb(err)));
};

const indexAuthors = (req, res, next) => {
  const book = req.params.book;
  return AuthorBook.find({ book: book }).populate('author')
    .then(authors => res.send(authors))
    .catch(err => next(error.mongodb(err)));
};

const associate = (req, res, next) => {
  const author = req.params.author || req.body.author;
  const book = req.params.book || req.body.book;
  if (!author || !book) {
    throw error.badRequest('Missing book or author');
  }
  return AuthorBook.find({ author: author, book: book }).then(results => {
    if (results.length > 0) {
      throw error.badRequest('Relation already exists');
    }
    var authorship = new AuthorBook({ author, book });
    authorship.save()
      .then(authorship => res.status(201).send(authorship))
      .catch(err => next(error.mongodb(err)));
  }).catch(err => next(error.mongodb(err)));
};

const unlink = (req, res, next) => {
  const author = req.params.author || req.body.author;
  const book = req.params.book || req.body.book;
  if (!author || !book) {
    throw error.badRequest('Missing book or author');
  }
  return AuthorBook.findOneAndDelete({ author, book })
    .then(() => res.status(204).send())
    .catch(err => next(error.mongodb(err)));
};

module.exports = {
  indexBooks,
  indexAuthors,
  associate,
  unlink
};
