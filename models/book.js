const mongoose = require("mongoose");

const coverImageBasePath = "uploads/covers";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  coverImageName: {
    type: String
  },
  description: {
    type: String,
  }
});

module.exports = mongoose.model("Book", bookSchema);
module.exports.coverImageBasePath = coverImageBasePath;
