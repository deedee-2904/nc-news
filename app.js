const express = require("express")
const app = express()
const { getAPI } = require("./controllers/getAPI")

app.use(express.json());

app.get("/api", getAPI)

module.exports = app