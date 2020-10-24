'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  name: String,
  email: { type: String, unique: true, index: true, requited: true },
  password: String,
  role: String,
  image: String
});

module.exports = mongoose.model('User', schema);
