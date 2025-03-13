const { fetchAllArticles } = require("../../models//article_models/fetchAllArticles");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order } = req.query;

  fetchAllArticles(sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
