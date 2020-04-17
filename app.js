const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
if (process.env.ENV === 'Test') {
  console.log('Running on a TEST environment');
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('Running on a Production environment');
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {
  console.log(`Node JS Express Server started on Port: ${port}`);
});

module.exports = app;
