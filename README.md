# Library 

## Things to do

- [X] Upload file path bug in multer
- [X] Store cover images on mongodb
- [X] Fix bug where submitting a blank page redirects as opposed to breaking the server
- [ ] hell lot of things
- [ ] use publish year instead of date
- [X] Add genre and rating for each book 
- [X] add no. of books by author
- [X] Add search option of books using author
- [ ] Show author name and pageCount and a short description on cover caption on book page
- [ ] Add darkmode feature
- [ ] Find a way to store cover images in cloud for free 
- [ ] Add a feature to upload notes and bookmarks
- [ ] Change search style
- [ ] Add genre and ratin search options for book

```
.
├── models
│   ├── author.js
│   └── book.js
├── public
│   ├── scripts
│   │   └── fileupload.js
│   └── styles
│       ├── author.css
│       ├── books.css
│       ├── button.css
│       ├── form.css
│       ├── header.css
│       ├── main.css
│       └── variables.css
├── routes
│   ├── authors.js
│   ├── books.js
│   └── index.js
├── views
│   ├── authors
│   │   ├── edit.ejs
│   │   ├── _form_fields.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── books
│   │   ├── edit.ejs
│   │   ├── _form_fields.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── index.ejs
│   ├── layouts
│   │   └── layout.ejs
│   └── partials
│       ├── book-show.ejs
│       ├── deleteform.ejs
│       ├── errorMessage.ejs
│       └── header.ejs
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
└── server.js

```