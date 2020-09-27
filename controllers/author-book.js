'use strict';

const AuthorBook = require('../models/author-book');

function saveAuthorBook(req, res) {
  const params = req.body;

  if (params.author === '' || params.author === null) {
    return res.status(400).send({
      error: true,
      message: "Missing 'name' parameter"
    });
  }
  if (params.book === '' || params.book === null) {
    return res.status(400).send({
      error: true,
      message: "Missing 'book' parameter"
    });
  }

  var authorBook = new AuthorBook();
  authorBook.author = params.author;
  authorBook.book = params.book;

  authorBook.save((err, data) => {
    if (err) {
      return res.status(400).send({
        error: true,
        message: "Error saving authorBook",
        content: err
      });
    } else if (data) {
      return res.status(200).send({
        message: "AuthorBook saved",
        data: data
      });
    } else {
      return res.status(500).send({
        error: true,
        message: "Error"
      });
    }
  });
}

module.exports = {
  saveAuthorBook
};
