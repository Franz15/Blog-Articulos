const express = require("express");
const router = express.Router();
const ArticlesController = require("../controllers/articles");

router.post("/list", ArticlesController.listArticles);
router.put("/:id", ArticlesController.archiveArticle);
router.delete("/:id", ArticlesController.removeArticle);

module.exports = router;
