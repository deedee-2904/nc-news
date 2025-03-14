const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const { pathErrorHandler } = require("./error_handling_funcs/path_error_handler");
const { customErrorHandler } = require("./error_handling_funcs/custom_error_handler");
const { psqlErrorHandler } = require("./error_handling_funcs/psql_error_handler");
const { serverErrorHandler } = require("./error_handling_funcs/server_error_handler");

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", pathErrorHandler);

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(serverErrorHandler);

module.exports = app;
