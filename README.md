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

```
.
├── node_modules/
├── models
│   ├── author.js
│   └── book.js
├── package.json
├── package-lock.json
├── public
│   └── scripts
│       └── fileupload.js
├── README.md
├── routes
│   ├── authors.js
│   ├── books.js
│   └── index.js
├── server.js
└── views
    ├── authors
    │   ├── _form_fields.ejs
    │   ├── edit.ejs
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── show.ejs
    ├── books
    │   ├── _form_fields.ejs
    │   ├── index.ejs
    │   └── new.ejs
    ├── index.ejs
    ├── layouts
    │   └── layout.ejs
    └── partials
        ├── deleteform.ejs
        ├── errorMessage.ejs
        └── header.ejs

```