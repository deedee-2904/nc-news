const usersRouter = require("express").Router()
const { getAllUsers } = require("../controllers/user_controllers/getAllUsers")
const { getUserByUsername } = require("../controllers/user_controllers/getUserByUsername")

usersRouter
.route("/")
.get(getAllUsers)

usersRouter
.route("/:username")
.get(getUserByUsername)

module.exports = usersRouter