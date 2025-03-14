const express = require("express");
const app = express();
const { getAPI } = require("./controllers/api_controllers/getAPI");
const { getAllTopics } = require("./controllers/topic_controllers/getAllTopics");
const { getArticleById } = require("./controllers/article_controllers/getArticleById");
const { psqlErrorHandler } = require("./error_handling_funcs/psql_error_handler");
const { customErrorHandler } = require("./error_handling_funcs/custom_error_handler");
const { serverErrorHandler } = require("./error_handling_funcs/server_error_handler");
const { getAllArticles } = require("./controllers/article_controllers/getAllArticles");
const {
  getCommentsByArticleId,
} = require("./controllers/article_controllers/getCommentsByArticleId");
const {
  postCommentByArticleId,
} = require("./controllers/article_controllers/postCommentByArticleId");
const { patchArticleById } = require("./controllers/article_controllers/patchArticleById");
const { deleteCommentById } = require("./controllers/comment_controllers/deleteCommentById");
const { getAllUsers } = require("./controllers/user_controllers/getAllUsers");

app.use(express.json());

app.get("/api", getAPI);

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchArticleById);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.get("/api/users", getAllUsers);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Path Not Found" });
});

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(serverErrorHandler);

module.exports = app;
