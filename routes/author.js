'use strict';

var express = require('express');
var AuthorController = require('../controllers/author');

var api = express.Router();

api.get('/authors', AuthorController.getAll);
api.post('/authors', AuthorController.create);
api.get('/authors/:author', AuthorController.getOne);
api.put('/authors/:author', AuthorController.update);
api.delete('/authors/:author', AuthorController.destroy);

module.exports = api;
