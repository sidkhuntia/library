const express = require("express");
const app = express();
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
  res.render("books/index");
});

// new book route
app.get("/new", async (req, res) => {
  renderNewPage(res, new Book());
});

//create book route

app.post("/", upload.single("cover"), async (req, res) => {
  console.log(req.body);
  const filename = req.file != null ? req.file.originalname : null;
  console.log("Cover: " + req.body.cover);
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    pulishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
    coverImageName: filename,
  });

  try {
    const newBook = await book.save();
    res.redirect("books");
  } catch (error) {
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
