exports.psqlErrorHandler = (err, req, res, next) => {
  if (err.code === "22P02"|| err.code==="23503"|| err.code === "23502" ||err.code==='42703'|| err.code==="42601") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
};
