const db = require("../../db/connection");


exports.fetchAllArticles = (sort_by, order, topic) => {
  const allowedColumnInputs = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "comment_count",
  ];

  const allowedOrderInputs = ["asc", "desc"];

  if (!sort_by) {
    sort_by = "created_at";
  }

  if (!order) {
    order = "desc";
  }

  if (!allowedColumnInputs.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid Column Input" });
  }

  if (!allowedOrderInputs.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid Sort Order Input" });
  }

  const queryValues = [];
  let queryStr = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url,
COUNT(articles.article_id)::INT AS comment_count FROM articles 
LEFT JOIN comments ON comments.article_id = articles.article_id`;

  if (topic) {
    queryValues.push(topic);
    queryStr += ` WHERE topic = $1`;
  }

  queryStr += ` GROUP BY articles.article_id ORDER BY articles.${sort_by} ${order}`;

return db.query(`${queryStr}`, queryValues)
  .then(({ rows }) => {
    return rows;
  })
};
