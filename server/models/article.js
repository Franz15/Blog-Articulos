const { Schema, model } = require("mongoose");

var article = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  archiveDate: {
    type: Date,
    default: null,
  },
});
const articleSchema = model("Article", article, "articles");

module.exports = { Article: articleSchema };
