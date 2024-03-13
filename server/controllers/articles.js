const { Article } = require("../models/article");

const listArticles = (req, res) => {
  if (req.body.type == "news") {
    param = null;
  } else if (req.body.type == "archived") {
    param = { $ne: null };
  } else {
    return res.status(404).json({
      status: "error",
      message: "type error",
    });
  }
  Article.find({ archiveDate: param })
    .sort({ date: -1 })
    .then(function (articles) {
      return res.status(200).send({
        status: "success",
        articles,
      });
    })
    .catch(function (err) {
      return res.status(404).json({
        status: "error",
        message: "error finding articles",
        err,
      });
    });
};

const archiveArticle = (req, res) => {
  let articleId = req.params.id;
  if (!articleId) {
    return res.status(404).json({
      status: "error",
      message: "error finding article",
    });
  }

  let date = Date.now();

  Article.find({ _id: articleId })
    .updateOne({ archiveDate: date })
    .then(function (articles) {
      return res.status(200).send({
        status: "success",
        articles,
      });
    })
    .catch(function (err) {
      return res.status(404).json({
        status: "error",
        message: "error finding articles",
        err,
      });
    });
};

const removeArticle = (req, res) => {
  let articleId = req.params.id;
  if (!articleId) {
    return res.status(404).json({
      status: "error",
      message: "error finding article",
    });
  }
  Article.find({ _id: articleId })
    .deleteOne()
    .then(function () {
      return res.status(200).send({
        status: "success",
        article: articleId,
      });
    })
    .catch(function (err) {
      return res.status(500).send({
        status: "error",
        message: "Error while deleting article",
      });
    });
};

module.exports = {
  listArticles,
  archiveArticle,
  removeArticle,
};
