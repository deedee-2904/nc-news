const express = require("express")
const app = express()
const { getAPI } = require("./controllers/getAPI");
const { getAllTopics } = require("./controllers/getAllTopics");
const { getArticleById } = require("./controllers/getArticlebyId");
const { psqlErrorHandler } = require("./error_handling_funcs/psql_error_handler");
const { customErrorHandler } = require("./error_handling_funcs/custom_error_handler");
const { serverErrorHandler } = require("./error_handling_funcs/server_error_handler");

app.use(express.json());

app.get("/api", getAPI)

app.get("/api/topics",getAllTopics)

app.get("/api/articles/:article_id",getArticleById )

app.all("*",(req,res,next) => { 
	res.status(404).send({msg:'Path not found'})
})

app.use(customErrorHandler)

app.use(psqlErrorHandler)

app.use(serverErrorHandler)



module.exports = app