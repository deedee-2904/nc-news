const express = require("express");
const app = express();
const { getAPI } = require("./controllers/getAPI");
const { getAllTopics } = require("./controllers/getAllTopics");
const { getArticleById } = require("./controllers/getArticlebyId");
const { psqlErrorHandler } = require("./error_handling_funcs/psql_error_handler");
const { customErrorHandler } = require("./error_handling_funcs/custom_error_handler");
const { serverErrorHandler } = require("./error_handling_funcs/server_error_handler");
const { getAllArticles } = require("./controllers/getAllArticles");
const { getCommentsByArticleId } = require("./controllers/getCommentsByArticleId");
const { postCommentByArticleId } = require("./controllers/postCommentByArticleId");

app.use(express.json());

app.get("/api", getAPI);

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId)

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(serverErrorHandler);

module.exports = app;
