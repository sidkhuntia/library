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
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true  
  },
  coverImageName: {
    type: String,
    required: true
  },
  description: {
    type: String,
  }
});

bookSchema.virtual("coverImagePath").get(function() {
  if(this.coverImageName != null) {
    return `/${coverImageBasePath}/${this.coverImageName}`;
  }
});


module.exports = mongoose.model("Book", bookSchema);
module.exports.coverImageBasePath = coverImageBasePath;
