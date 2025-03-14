const { getAllTopics } = require("../controllers/topic_controllers/getAllTopics")
const topicsRouter =  require("express").Router()

topicsRouter.get("/", getAllTopics)

module.exports = topicsRouter