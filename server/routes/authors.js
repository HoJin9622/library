const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');

// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {};
  let authors;

  if (req.query.name !== null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    authors = await Author.find(searchOptions);
    return res.status(200).json({ success: true, authors: authors });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

//Create Author Route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    return res.status(200).json({ success: true, authors: newAuthor });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    res
      .status(200)
      .json({ success: true, author: author, booksByAuthor: books });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.status(200).json({ success: true, author: author });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

router.put('/:id', async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.status(200).json({ success: true, author: author });
  } catch (err) {
    if (author == null) {
      // author를 찾지 못했을 때
      res.status(400).json({ success: false, err });
    } else {
      res.status(400).json({
        author: author,
        errorMessage: 'Error updating Author',
      });
    }
  }
});

router.delete('/:id', async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    await author.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    if (author == null) {
      res.status(404).json({ success: false, err });
    } else {
      res.status(400).json({ success: false, err });
    }
  }
});

module.exports = router;
