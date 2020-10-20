'use strict';

const AuthorBook = require('../models/author-book');
const message = require('../models/message');

const indexBooks = (req, res) => {
  const author = req.params.author;
  AuthorBook.find({ author: author }).populate('book').then((books) => {
    return res.send(books);
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t get books', err));
  });
};

const indexAuthors = (req, res) => {
  const book = req.params.book;
  AuthorBook.find({ book: book }).populate('author').then((authors) => {
    return res.send(authors);
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t get authors', err));
  });
};

const associate = (req, res) => {
  const author = req.params.author || req.body.author;
  const book = req.params.book || req.body.book;
  AuthorBook.find({
    author: author,
    book: book
  }).then(results => {
    if (results.length > 0) {
      return res.status(400).send(message.error('Relation already exists'));
    }
    var authorship = new AuthorBook({
      author: author,
      book: book
    });
    authorship.save().then((authorship) => {
      return res.status(201).send(authorship);
    }).catch((err) => {
      return res.status(400).send(message.error('Can\'t save book', err));
    });
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t save book', err));
  });
};

const unlink = (req, res) => {
  const author = req.params.author || req.body.author;
  const book = req.params.book || req.body.book;
  AuthorBook.findOneAndDelete({
    author: author,
    book: book
  }).then(() => {
    return res.status(204).send();
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t remove relation', err));
  });
};

module.exports = {
  indexBooks,
  indexAuthors,
  associate,
  unlink
};
