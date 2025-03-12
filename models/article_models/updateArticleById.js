const db = require("../../db/connection");

exports.updateArticleById = (article_id, inc_votes) => {
  if (!inc_votes || isNaN(inc_votes)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return db
    .query(`UPDATE articles SET votes = votes + ${inc_votes} WHERE article_id = $1 RETURNING *`, [
      article_id,
    ])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${article_id}`,
        });
      }
      return rows[0];
    });
};
