const db = require("../db/connection");

exports.addCommentByArticleId = (article_id, username, body) => {
  console.log(article_id, username, body);
  let date = "2025-03-11T16:00:41.586Z";

  return db
    .query(
      `INSERT INTO comments (article_id, author, body,created_at) VALUES ($1, $2, $3, $4) RETURNING *`,
      [article_id, username, body, date]
    )
    .then(({ rows }) => {
      console.log(rows,"<<< rows");
      return rows[0];
    })
    .catch((err)=>{
        return Promise.reject(err)
    });
};
