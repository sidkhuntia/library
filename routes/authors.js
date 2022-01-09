const express = require("express");
const app = express();
const Author = require("../models/author");

//author home page
app.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find({ name:searchOptions });
    console.log(authors[0].name)
    res.render("authors/index.ejs", {
      authors: authors,
      searchOptions: req.query.name,
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
    res.redirect("/authors");
  } catch (error) {
    res.render("authors/new.ejs", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

module.exports = app;
