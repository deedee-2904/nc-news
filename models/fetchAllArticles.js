const db = require("../db/connection");

exports.fetchAllArticles = () => {
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url,
    COUNT(articles.article_id)::INT AS comment_count FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`
    )
    .then(({ rows }) => {
      const articles = rows;
      return articles;
    });
};
