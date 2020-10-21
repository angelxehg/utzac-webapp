'use strict';

const Author = require('../models/author');
const error = require('../helpers/error-handler');

const index = (req, res, next) => {
  return Author.find()
    .then(authors => res.send(authors))
    .catch(err => next(error.mongodb(err)));
}

const store = (req, res, next) => {
  const params = req.body;
  if (params.name == '' || params.name == null) {
    throw error.badRequest('Missing parameter name');
  }
  if (params.country == '' || params.country == null) {
    throw error.badRequest('Missing parameter country');
  }
  var author = new Author();
  author.name = params.name;
  author.country = params.country;
  return author.save()
    .then(author => res.status(201).send(author))
    .catch(err => next(error.mongodb(err)));
}

const show = (req, res, next) => {
  const id = req.params.author;
  return Author.findById(id).then((author) => {
    if (!author) {
      throw error.notFound('No author found');
    }
    return res.send(author);
  }).catch(err => next(error.mongodb(err)));
}

const update = (req, res, next) => {
  const id = req.params.author;
  const params = req.body;
  if (params.name == '' || params.name == null) {
    throw error.badRequest('Missing parameter name');
  }
  if (params.country == '' || params.country == null) {
    throw error.badRequest('Missing parameter country');
  }
  return Author.findById(id).then((author) => {
    if (!author) {
      throw error.notFound('No author found');
    }
    author.name = params.name;
    author.country = params.country;
    author.save()
      .then(author => res.send(author))
      .catch(err => next(error.mongodb(err)));
  }).catch(err => next(error.mongodb(err)));
}

const destroy = (req, res, next) => {
  const id = req.params.author;
  return Author.findByIdAndDelete(id)
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
