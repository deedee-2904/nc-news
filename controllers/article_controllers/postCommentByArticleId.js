const { checkExists } = require("../../db/seeds/utils");
const { addCommentByArticleId } = require("../../models/article_models/addCommentByArticleId");

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  checkExists("articles", "article_id", article_id)
    .then((checkExists) => {
      if(checkExists.status){
        const {status, msg}=checkExists
        res.status(status).send({msg})
      }
      return addCommentByArticleId(article_id, username, body);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
