const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const Book = require("../models/book");
const Author = require("../models/author");
const uploadPath = path.join("public", Book.coverImageBasePath);
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

//book home page
app.get("/", async (req, res) => {
  res.render("books/index");
});

// new book route
app.get("/new", async (req, res) => {
  try {
    const book = new Book();
    const authors = await Author.find();
    res.render("books/new", {
      authors: authors,
      book: book,
    });
  } catch {
    res.redirect("/books");
  }
});

//create book route

app.post("/",upload.single('cover'), async (req, res) => {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    pulishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
    coverImageName: req.file.filename
  });

  try {
      const newBook = await book.save();
      res.redirect("/books");
  } catch (error) {
    console.log(error);
  }
      
});

module.exports = app;
