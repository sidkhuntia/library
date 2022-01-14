const express = require("express");
const app = express();
const Book = require("../models/book");
const Author = require("../models/author");
const e = require("express");
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
    res.render("books/index", {
      books: books,
      searchOptions: req.query,
      authors: authors,
    });
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
    genre: req.body.genre,
    rating: req.body.rating,
    description: req.body.description,
  });
  try {
    saveBookCover(book, req.body.cover);
    const newBook = await book.save();
    res.redirect(`books/${newBook.id}`);
  } catch (error) {
    console.log(error)
    renderNewPage(res, book, true);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author").exec();
    res.render("books/show", { book: book });
  } catch {
    res.redirect("/books");
  }
});

app.get("/:id/edit", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    renderPage(res, book, "edit");
  } catch {
    res.redirect("/books");
  }
});

app.put("/:id", async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    (book.name = req.body.name),
      (book.author = req.body.author),
      (book.publishDate = new Date(req.body.publishDate)),
      (book.pageCount = req.body.pageCount),
      (book.genre = req.body.genre),
      (book.rating = req.body.rating),
      (book.description = req.body.description),
      (book.createdAt = new Date());
    if (req.body.cover != null && req.body.cover != "") {
      saveBookCover(book, req.body.cover);
    }
    await book.save();
    res.redirect(`/books/${book.id}`);
  } catch {
    if (book != null) {
      renderPage(res, book, "edit", true);
    } else {
      res.redirect("/books");
    }
  }
});

app.delete("/:id", async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    await book.remove();
    res.redirect("/books");
  } catch (error) {
    if (book != null) {
      res.render("books/show", {
        book: book,
        errorMessage: "Error deleting book",
      });
    } else {
      res.redirect("/books");
    }
  }
});

async function renderNewPage(res, book, errors = false) {
  renderPage(res, book, "new", errors);
}

async function renderPage(res, book, form, errors = false) {
  try {
    const authors = await Author.find();
    const params = {
      authors: authors,
      book: book,
    };
    if (errors) {
      if (form === "edit") {
        params.errorMessage = "Error updating book";
      } else {
        params.errorMessage = "Error creating book";
      }
    }
    res.render(`books/${form}`, params);
  } catch {
    if (book != null) {
      renderPage(res, book, "edit", true);
    } else {
      res.redirect(`/books/${book.id}`);
    }
  }
}

function saveBookCover(book, coverEncoded) {
  if (coverEncoded === null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    (book.coverImage = new Buffer.from(cover.data, "base64")),
      (book.coverImageType = cover.type);
  }
}

module.exports = app;
