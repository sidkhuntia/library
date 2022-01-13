const express = require("express");
const app = express();
const Book = require("../models/book");
const Author = require("../models/author");
const imageMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

//book home page
app.get("/", async (req, res) => {
  // declaring a empty object to store search options
  let query = Book.find();
  // filter using the name of the book
  if (req.query.name != null && req.query.name !== "") {
    const regex = new RegExp(req.query.name, "i");
    query = Book.find({ name: regex });
  }

  // filter using the author of the book
  if (req.query.author != null && req.query.author !== "") {
    console.log(req.query.author);
    query = Book.find({ author: req.query.author });
  }

  // filter using the puslish date of the book
  if (req.query.publishedBefore != null && req.query.publishedBefore !== "") {
    query = query.lte("publishDate", req.query.publishedBefore);
  }

  if (req.query.publishedAfter != null && req.query.publishedAfter !== "") {
    query = query.gte("publishDate", req.query.publishedAfter);
  }
  try {
    const books = await query.exec();
    const authors = await Author.find();
    res.render("books/index", { books: books, searchOptions: req.query, authors: authors });
  } catch (err) {
    res.redirect("/");
  }
});

// new book route
app.get("/new", async (req, res) => {
  renderNewPage(res, new Book());
});

//create book route

app.post("/", async (req, res) => {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description
  });
  try {
    const newBook = await book.save();
    saveBookCover(book, req.body.cover);
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

function saveBookCover(book, coverEncoded){
  if(coverEncoded === null) return;
  const cover = JSON.parse(coverEncoded)
  if(cover != null && imageMimeTypes.includes(cover.type)){
    book.coverImage = new Buffer.from(cover.data, 'base64'),
    book.coverImageType = cover.type
  }
}

module.exports = app;
