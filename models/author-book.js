const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AuthorBookSchema = Schema({
  author: { type: Schema.ObjectId, ref: 'Author' },
  books: { type: Schema.ObjectId, ref: 'Book' }
});

module.exports = mongoose.model('AuthorBook', AuthorBookSchema);