const express = require("express");
const app = express();
const Author = require("../models/author");

app.get("/", (req, res) => {
  res.render("authors/index.ejs");
});

//new author route
app.get("/new", (req, res) => {
  res.render("authors/new.ejs", { author: new Author() });
});

app.post("/", (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  author.save((err) => {
    if (err) {
      res.render("authors/new.ejs", { 
        author : author,
        errorMessage: "Error creating Author"
      });
    } else {
      res.redirect("/authors");
    }
  });
});
module.exports = app;
