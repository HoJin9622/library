if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/api', indexRouter);
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);

app.listen(process.env.PORT || 5000);
