const express = require("express");
const router = express.Router();
const ArticlesController = require("../controllers/articles");

router.post("/save", ArticlesController.saveArticle);
router.post("/list", ArticlesController.listArticles);
router.put("/:id", ArticlesController.toggleArchiveArticle);
router.delete("/:id", ArticlesController.removeArticle);

module.exports = router;
