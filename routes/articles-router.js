const { getAllArticles } = require("../controllers/article_controllers/getAllArticles")
const { getArticleById } = require("../controllers/article_controllers/getArticleById")
const { getCommentsByArticleId } = require("../controllers/article_controllers/getCommentsByArticleId")
const { patchArticleById } = require("../controllers/article_controllers/patchArticleById")
const { postCommentByArticleId } = require("../controllers/article_controllers/postCommentByArticleId")

const articlesRouter = require("express").Router()

articlesRouter
.route("/")
.get(getAllArticles)

articlesRouter
.route("/:article_id")
.get(getArticleById)
.patch(patchArticleById)

articlesRouter
.route("/:article_id/comments")
.get(getCommentsByArticleId)
.post(postCommentByArticleId)

module.exports = articlesRouter