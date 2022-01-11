const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const Book = require("../models/book");
const Author = require("../models/author");
const uploadPath = path.join("public", Book.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

//book home page
app.get("/", async (req, res) => {
  // declaring a empty object to store search options
  let query = Book.find();
  let searchOptions = [];

  const au = req.query.author;
  const na = req.query.name;

  // filter using the name of the book
  if (req.query.name != null && req.query.name !== "") {
    const regex = new RegExp(req.query.name, "i");
    query = Book.find({ name: regex });
    searchOptions['name'] = regex;
  }

  // filter using the puslish date of the book
  if (req.query.publishedBefore != null && req.query.publishedBefore !== "") {
    query = query.lte("publishDate", req.query.publishedBefore);
    searchOptions = {
      publishDate: { $lte: req.query.publishedBefore },
    };
  }

  if (req.query.publishedAfter != null && req.query.publishedAfter !== "") {
    query = query.gte("publishDate", req.query.publishedAfter);
    searchOptions = {
      publishDate: { $gte: req.query.publishedAfter },
    };
  }
  try {
    const books = await query.exec();
    res.render("books/index", { books: books, searchOptions: req.query });
  } catch (err) {
    res.redirect("/");
  }
});

// new book route
app.get("/new", async (req, res) => {
  renderNewPage(res, new Book());
});

//create book route

app.post("/", upload.single("cover"), async (req, res) => {
  const filename = req.file != null ? req.file.filename : null;
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
    coverImageName: filename,
  });

  try {
    const newBook = await book.save();
    res.redirect("books");
  } catch (error) {
    if (filename != null) {
      fs.unlink(path.join(uploadPath, filename), () => {});
    }
    renderNewPage(res, book, true);
  }
});

async function renderNewPage(res, book, errors = false) {
  try {
    const authors = await Author.find();
    const params = {
      authors: authors,
      book: book,
    };
    if (errors) {
      params.errorMessage = "Error creating book";
    }
    res.render("books/new", params);
  } catch {
    res.redirect("/books");
  }
}

module.exports = app;
