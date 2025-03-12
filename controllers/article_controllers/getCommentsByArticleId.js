const { fetchArticleById } = require("../../models/article_models/fetchArticleById");
const { fetchCommentsByArticleId } = require("../../models/article_models/fetchCommentsByArticleId");

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [fetchArticleById(article_id)];
  promises.push(fetchCommentsByArticleId(article_id));

  return Promise.all(promises)
    .then(([_, comments]) => {
      if (!comments.length) {
        res.status(404).send({ msg: `No comments found for article_id: ${article_id}` });
      }
      res.status(200).send({ comments });
    })
    .catch(next);
};
