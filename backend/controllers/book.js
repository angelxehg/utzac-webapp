'use strict';

const Book = require('../models/book');
const error = require('../helpers/error-handler');

const index = (req, res, next) => {
  return Book.find()
    .then(books => res.send(books))
    .catch(err => next(error.mongodb(err)));
}

const store = (req, res, next) => {
  const params = req.body;
  if (params.title == '' || params.title == null) {
    throw error.badRequest('Missing parameter title');
  }
  var book = new Book();
  book.title = params.title;
  return book.save()
    .then(book => res.status(201).send(book))
    .catch(err => next(error.mongodb(err)));
}

const show = (req, res, next) => {
  const id = req.params.book;
  return Book.findById(id).then((book) => {
    if (!book) {
      throw error.notFound('No book found');
    }
    return res.send(book);
  }).catch(err => next(error.mongodb(err)));
}

const update = (req, res, next) => {
  const id = req.params.book;
  const params = req.body;
  if (params.title == '' || params.title == null) {
    throw error.badRequest('Missing parameter title');
  }
  return Book.findById(id).then((book) => {
    if (!book) {
      throw error.notFound('No book found');
    }
    book.title = params.title;
    book.save()
      .then(book => res.send(book))
      .catch(err => next(error.mongodb(err)));
  }).catch(err => next(error.mongodb(err)));
}

const destroy = (req, res, next) => {
  const id = req.params.book;
  return Book.findByIdAndDelete(id)
    .then(() => res.status(204).send())
    .catch(err => next(error.mongodb(err)));
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy
};
