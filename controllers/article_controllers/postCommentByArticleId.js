const { addCommentByArticleId } = require("../../models/article_models/addCommentByArticleId");
const { fetchArticleById } = require("../../models/article_models/fetchArticleById");

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const validFields = ["username", "body"];
  const inputFields = Object.keys(req.body);

  if (
    inputFields.length !== validFields.length ||
    !validFields.every((field) => inputFields.includes(field))
  ) {
    res.status(400).send({ msg: "Bad Request" });
  }

  const promises = [fetchArticleById(article_id)];

  promises.push(addCommentByArticleId(article_id, username, body));

  Promise.all(promises)
    .then(([article, comment]) => {
      if (article) {
        res.status(201).send({ comment });
      } else if (!article) {
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
};
