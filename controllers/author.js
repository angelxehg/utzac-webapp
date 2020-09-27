'use strict';

const Author = require('../models/author');
const message = require('../models/message');

function getAll(req, res) {
  Author.find().then((authors) => {
    return res.send(authors);
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t get authors', err));
  })
}

function getOne(req, res) {
  const id = req.params.author;
  Author.findById(id).then((author) => {
    if (!author) {
      return res.status(400).send(message.error('Can\'t get author', err));
    }
    return res.send(author);
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t get author', err));
  })
}

function create(req, res) {
  const params = req.body;
  if (params.name == '' || params.name == null) {
    return res.status(400).send(message.missing('name'));
  }
  if (params.country == '' || params.country == null) {
    return res.status(400).send(message.missing('country'));
  }
  var author = new Author();
  author.name = params.name;
  author.country = params.country;
  author.save().then((author) => {
    return res.status(201).send(author);
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t save author', err));
  })
}

function update(req, res) {
  const id = req.params.author;
  const params = req.body;
  if (params.name == '' || params.name == null) {
    return res.status(400).send(message.missing('name'));
  }
  if (params.country == '' || params.country == null) {
    return res.status(400).send(message.missing('country'));
  }
  Author.findById(id).then((author) => {
    author.name = params.name;
    author.country = params.country;
    author.save().then((author) => {
      return res.send(author);
    }).catch((err) => {
      return res.status(400).send(message.error('Can\'t update author', err));
    });
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t get author', err));
  });
}

function destroy(req, res) {
  const id = req.params.author;
  Author.findByIdAndDelete(id).then(() => {
    return res.status(204).send();
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t delete author', err));
  });
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
};
