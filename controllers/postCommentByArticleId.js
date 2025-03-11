const { addCommentByArticleId } = require("../models/addCommentByArticleId");

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  addCommentByArticleId(article_id, username, body)
  .then((comment) => {
    res.status(201).send({comment})
  }).catch((err)=>{
    next(err)
  });
};
