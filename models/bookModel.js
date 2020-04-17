const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema(
  {
    isbn: { type: String },
    title: { type: String },
    subtitle: { type: String },
    author: { type: String },
    published: { type: String },
    publisher: { type: String },
    pages: { type: Number },
    description: { type: String },
    website: { type: String },
    read: { type: Boolean, default: false },
  }
);
module.exports = mongoose.model('Book', bookModel);
