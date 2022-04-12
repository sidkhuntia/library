const express = require("express");
const app = express();
const Author = require("../models/author");
const Book = require("../models/book");

//author home page
app.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index.ejs", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

//new author route
app.get("/new", (req, res) => {
  res.render("authors/new.ejs", { author: new Author() });
});

//create author route

app.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect("/authors/" + newAuthor.id);
  } catch (error) {
    res.render("authors/new.ejs", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).exec();
    res.render("authors/show.ejs", {
      author: author,
      books: books,
    });
  } catch {
    res.redirect("/");
  }
});
app.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render("authors/edit.ejs", { author: author });
  } catch {
    res.redirect("/authors");
  }
});
app.put("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect("/authors/" + author.id);
  } catch (error) {
    if (author == null) {
      res.redirect("/");
    } else {
      res.render("authors/edit", {
        author: author,
        errorMessage: "Error saving changes",
      });
    }
  }
});
app.delete("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id });
    //delete all books by this author
    books.forEach(async (book) => {
      await book.remove();
    });
    await author.remove();
    res.redirect("/authors");
  } catch (error) {
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect("/authors");
      console.log(error);
    }
  }
});

module.exports = app;
