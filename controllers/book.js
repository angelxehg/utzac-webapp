'use strict';

const Book = require('../models/book');
const message = require('../models/message');

function getAll(req, res) {
  Book.find().then((books) => {
    return res.send(books);
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t get books', err));
  })
}

function getOne(req, res) {
  const id = req.params.book;
  Book.findById(id).then((book) => {
    if (!book) {
      return res.status(400).send(message.error('Can\'t get book', err));
    }
    return res.send(book);
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t get book', err));
  })
}

function create(req, res) {
  const params = req.body;
  if (params.title == '' || params.title == null) {
    return res.status(400).send(message.missing('title'));
  }
  var book = new Book();
  book.title = params.title;
  book.save().then((book) => {
    return res.status(201).send(book);
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t save book', err));
  })
}

function update(req, res) {
  const id = req.params.book;
  const params = req.body;
  if (params.title == '' || params.title == null) {
    return res.status(400).send(message.missing('title'));
  }
  Book.findById(id).then((book) => {
    book.title = params.title;
    book.save().then((book) => {
      return res.send(book);
    }).catch((err) => {
      return res.status(400).send(message.error('Can\'t update book', err));
    });
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t get book', err));
  });
}

function destroy(req, res) {
  const id = req.params.book;
  Book.findByIdAndDelete(id).then(() => {
    return res.status(204).send();
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t delete book', err));
  });
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
};
