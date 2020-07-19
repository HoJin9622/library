const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', async (req, res) => {
  let books;

  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec();

    return res.status(200).json({ success: true, books: books });
  } catch {
    return res.status(400).json({ success: false, err });
  }
});

module.exports = router;
