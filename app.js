const express = require("express")
const app = express()
const { getAPI } = require("./controllers/getAPI");
const { getAllTopics } = require("./controllers/getAllTopics");

app.use(express.json());

app.get("/api", getAPI)

app.get("/api/topics",getAllTopics)

app.all("*",(req,res,next) => { 
	res.status(404).send({msg:'Path not found'})
})

module.exports = app