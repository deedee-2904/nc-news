const usersRouter = require("express").Router()
const { getAllUsers } = require("../controllers/user_controllers/getAllUsers")

usersRouter
.route("/")
.get(getAllUsers)

module.exports = usersRouter