exports.pathErrorHandler = (req, res, next) => {
  res.status(404).send({ msg: "Path Not Found" });
};
