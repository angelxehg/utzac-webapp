'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookSchema = Schema({
  title: String,
});

module.exports = mongoose.model('Book', BookSchema);