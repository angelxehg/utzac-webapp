'use strict';

const Book = require('../models/book');

function saveBook(req, res) {
  const params = req.body;

  if (params.title === '' || params.title === null) {
    return res.status(400).send({
      error: true,
      message: "Missing 'title' parameter"
    });
  }

  var book = new Book();
  book.title = params.title;

  book.save((err, data) => {
    if (err) {
      return res.status(400).send({
        error: true,
        message: "Error saving book",
        content: err
      });
    } else if (data) {
      return res.status(200).send({
        message: "Book saved",
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
  saveBook
};
