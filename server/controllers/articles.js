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

const saveArticle = async (req, res) => {
  try {
    const params = req.body;
    let newArticle = new Article(params);

    const articleStored = await newArticle.save();

    return res.status(200).send({
      status: "success",
      message: "Artículo guardado correctamente",
      article: articleStored,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Artículo no guardado",
      error: error.message,
    });
  }
};

const toggleArchiveArticle = (req, res) => {
  let articleId = req.params.id;

  if (!articleId) {
    return res.status(404).json({
      status: "error",
      message: "error finding article",
    });
  }

  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        return res.status(404).json({
          status: "error",
          message: "Article not found",
        });
      }
      let update = article.archiveDate
        ? { $unset: { archiveDate: "" } }
        : { $set: { archiveDate: Date.now() } };

      return Article.findByIdAndUpdate(articleId, update, { new: true });
    })
    .then((updatedArticle) => {
      return res.status(200).send({
        status: "success",
        article: updatedArticle,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Error toggling archive status",
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
  saveArticle,
  toggleArchiveArticle,
  removeArticle,
};
