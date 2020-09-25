const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AuthorSchema = Schema({
  name: String,
  country: String
});

module.exports = mongoose.model('Author', AuthorSchema);
