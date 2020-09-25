'use strict';

const Author = require('../models/author');

function saveAuthor(req, res) {
  const params = req.body;

  if (params.name === '' || params.name === null) {
    return res.status(400).send({
      error: true,
      message: "Missing 'name' parameter"
    });
  }
  if (params.country === '' || params.country === null) {
    return res.status(400).send({
      error: true,
      message: "Missing 'country' parameter"
    });
  }

  var author = new Author();
  author.name = params.name;
  author.country = params.country;

  author.save((err, data) => {
    if (err) {
      return res.status(400).send({
        error: true,
        message: "Error saving author",
        content: err
      });
    } else if (data) {
      return res.status(200).send({
        message: "Author saved",
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
  saveAuthor
};
