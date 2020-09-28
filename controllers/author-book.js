'use strict';

const AuthorBook = require('../models/author-book');
const message = require('../models/message');

function getAuthorBooks(req, res) {
  const author = req.params.author;
  AuthorBook.find({ author: author }).populate('book').then((books) => {
    return res.send(books);
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t get books', err));
  });
}

function getBookAuthors(req, res) {
  const book = req.params.book;
  console.log(book);
  AuthorBook.find({ book: book }).populate('author').then((authors) => {
    return res.send(authors);
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t get authors', err));
  });
}

function addBookToAuthor(req, res) {
  const author = req.params.author;
  const book = req.body.book;
  if (book == '' || book == null) {
    return res.status(400).send(message.missing('book'));
  }
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
}

function addAuthorToBook(req, res) {
  const author = req.body.author;
  const book = req.params.book;
  if (author == '' || author == null) {
    return res.status(400).send(message.missing('author'));
  }
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
      return res.status(400).send(message.error('Can\'t save author', err));
    });
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t save author', err));
  });
}

function removeBookFromAuthor(req, res) {
  const author = req.params.author;
  const book = req.body.book;
  if (book == '' || book == null) {
    return res.status(400).send(message.missing('book'));
  }
  AuthorBook.findOneAndDelete({
    author: author,
    book: book
  }).then(() => {
    return res.status(204).send();
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t remove book', err));
  });
}

function removeAuthorFromBook(req, res) {
  const author = req.body.author;
  const book = req.params.book;
  if (author == '' || author == null) {
    return res.status(400).send(message.missing('author'));
  }
  AuthorBook.findOneAndDelete({
    author: author,
    book: book
  }).then(() => {
    return res.status(204).send();
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t remove author', err));
  });
}

module.exports = {
  getAuthorBooks,
  getBookAuthors,
  addBookToAuthor,
  addAuthorToBook,
  removeBookFromAuthor,
  removeAuthorFromBook
};
