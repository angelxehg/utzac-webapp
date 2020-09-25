const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AuthorBookSchema = Schema({
  bookId: Number,
  authorId: Number,
});

module.exports = mongoose.model('AuthorBook', AuthorBookSchema);