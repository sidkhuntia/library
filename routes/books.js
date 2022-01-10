const express = require("express");
const app = express();
const Book = require("../models/book");
const Author = require("../models/author");

//book home page
app.get("/", async (req, res) => {
    res.send("all books");
});

//new book route
app.get("/new", async (req, res) => {
    console.log("HERE");
    try {
        const authors = await Author.find({});
        const book = new Book();
        res.render("books/new.ejs", {
            authors: authors,
            book: book,
        });
    } catch {
        res.redirect("/books");
    }
});

//create book route

app.post("/", async (req, res) => {
    res.send("create books");

});

module.exports = app;
