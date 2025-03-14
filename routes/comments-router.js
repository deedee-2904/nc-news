const commentsRouter = require("express").Router()
const { deleteCommentById } = require("../controllers/comment_controllers/deleteCommentById")

commentsRouter
.route("/:comment_id")
.delete(deleteCommentById)

module.exports = commentsRouter