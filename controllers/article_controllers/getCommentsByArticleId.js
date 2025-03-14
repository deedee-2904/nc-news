const { checkExists } = require("../../db/seeds/utils");
const { fetchCommentsByArticleId } = require("../../models/article_models/fetchCommentsByArticleId");

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [checkExists("articles","article_id",article_id)];
  promises.push(fetchCommentsByArticleId(article_id));

  return Promise.all(promises)
    .then(([articleExists, comments]) => {
      if (articleExists === true){
        res.status(200).send({ comments })
    }
      else{
        const {status, msg} = articleExists
        res.status(status).send({msg})
      };
    })
    .catch(next);
};
