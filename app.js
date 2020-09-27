'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var authors = require('./routes/author');
var books = require('./routes/book');
var authorBooks = require('./routes/author-book');

app.use('/api', authors);
app.use('/api', books);
app.use('/api', authorBooks);

module.exports = app;
