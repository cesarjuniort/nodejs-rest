const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookModel');

const appRouter = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

appRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    book.save();
    return res.status(201).json(book);
  })
  .get((req, res) => {
    const { query } = req;
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

appRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

app.use('/api', appRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(port, () => {
  console.log(`Node JS Express Server started on Port: ${port}`);
});
