const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

const Book = require('../models/book');
const Author = require('../models/author');

const s3 = new aws.S3({
  accessKeyId: '',
  secretAccessKey: '',
  Bucket: '',
});

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: '',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('profileImage');

// Image type check
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// All Books Route
router.get('/', async (req, res) => {
  let query = Book.find();
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishDate', req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishDate', req.query.publishedAfter);
  }
  try {
    const books = await query.exec();
    res
      .status(200)
      .json({ success: true, books: books, searchOptions: req.query });
  } catch (err) {
    res.status(400).json({ success: false, err: err });
  }
});

// New Book Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Book());
});

// Create Book Route
router.post('/', (req, res) => {
  console.log(req);
  profileImgUpload(req, res, (error) => {
    // console.log( 'requestOkokok', req.file );
    // console.log( 'error', error );
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // If Success
        /*         const book = new Book({
          title: req.body.title,
          author: req.body.author,
          publishDate: new Date(req.body.publishDate),
          pageCount: req.body.pageCount,
          description: req.body.description,
          imageName: req.file.key,
          imageLocation: req.file.location,
        }); */

        //const newBook = book.save();
        // Save the file name into database into profile model
        res.json({ success: true, imageName, imageLocation });
      }
    }
  });

  /*   try {
    const newBook = await book.save();
    res.redirect(`books/${newBook.id}`);
  } catch {
    renderNewPage(res, book, true);
  } */
});

// Show Book Route
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author').exec();
    res.render('books/show', { book: book });
  } catch {
    res.redirect('/');
  }
});

// Edit Book Route
router.get('/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    renderEditPage(res, book);
  } catch {
    res.redirect('/');
  }
});

// Update Book Route
router.put('/:id', async (req, res) => {
  let book;

  try {
    book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.author = req.body.author;
    book.publishDate = new Date(req.body.publishDate);
    book.pageCount = req.body.pageCount;
    book.description = req.body.description;
    if (req.body.cover != null && req.body.cover != '') {
      saveCover(book, req.body.cover);
    }
    await book.save();
    res.redirect(`/books/${book.id}`);
  } catch {
    if (book != null) {
      renderEditPage(res, book, true);
    } else {
      redirect('/');
    }
  }
});

// Delete Book Page
router.delete('/:id', async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    await book.remove();
    res.redirect('/books');
  } catch {
    if (book != null) {
      res.render('books/show', {
        book: book,
        errorMessage: 'Could not remove book',
      });
    } else {
      res.redirect('/');
    }
  }
});

async function renderNewPage(res, book, hasError = false) {
  renderFormPage(res, book, 'new', hasError);
}

async function renderEditPage(res, book, hasError = false) {
  renderFormPage(res, book, 'edit', hasError);
}

async function renderFormPage(res, book, form, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      authors: authors,
      book: book,
    };
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating Book';
      } else {
        params.errorMessage = 'Error Creating Book';
      }
    }
    /*     res.render(`books/${form}`, params); */
    res.status(200).json({ success: true, params });
  } catch (err) {
    /*     res.redirect('/books'); */
    res.status(400).json({ success: false, err });
  }
}

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64');
    book.coverImageType = cover.type;
  }
}

module.exports = router;
