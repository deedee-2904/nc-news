const { checkExists } = require("../../db/seeds/utils");
const { fetchAllArticles } = require("../../models//article_models/fetchAllArticles");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  const promises = [fetchAllArticles(sort_by, order, topic)];

  if (topic) {
    promises.push(checkExists("topics", "slug", topic));
  }

  Promise.all(promises)
    .then(([articles, checkExists]) => {
      if (checkExists === true || topic === undefined){
        res.status(200).send({ articles })
    }
      else{
        const {status, msg} = checkExists
        res.status(status).send({msg})
      };
    })
    .catch((err) => {
      next(err);
    });
};
