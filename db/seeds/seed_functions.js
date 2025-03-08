const format = require("pg-format");
const { convertTimestampToDate } = require("./utils");

function createTopicsQuery() {
  return `CREATE TABLE topics(
    slug VARCHAR PRIMARY KEY,
    description VARCHAR NOT NULL,
    img_url VARCHAR(1000)
    );`;
}

function insertTopics(topicData) {
  const topicToFormat = topicData.map((topic) => {
    return [topic.slug, topic.description, topic.img_url];
  });
  return format(
    `INSERT into topics (slug, description, img_url)
    VALUES %L RETURNING *`,
    topicToFormat
  );
}

function createUsersQuery() {
  return `CREATE TABLE users(
        username VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        avatar_url VARCHAR(1000)
    );`;
}

function insertUsers(userData) {
  const userToFormat = userData.map((user) => {
    return [user.username, user.name, user.avatar_url];
  });
  return format(
    `INSERT into users (username, name, avatar_url)
    VALUES %L RETURNING *`,
    userToFormat
  );
}

function createArticlesQuery() {
  return `CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        topic VARCHAR REFERENCES topics(slug) NOT NULL,
        author VARCHAR REFERENCES users(username) NOT NULL,
        body TEXT NOT NULL,
        created_at TIMESTAMP,
        votes INT DEFAULT 0 NOT NULL,
        article_img_url VARCHAR(1000)      

    );`;
}

function insertArticles(articleData) {
  const articleToFormat = articleData.map((article) => {
    let newArticle = convertTimestampToDate(article);
    return [
      newArticle.title,
      newArticle.topic,
      newArticle.author,
      newArticle.body,
      newArticle.created_at,
      newArticle.votes,
      newArticle.article_img_url,
    ];
  });
  return format(
    `INSERT INTO articles
        (title, topic, author, body, created_at, votes, article_img_url)
        VALUES
        %L
        RETURNING *;`,
    articleToFormat
  );
}

function createCommentsQuery() {
  return `CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(article_id),
    body TEXT NOT NULL,
    votes INT DEFAULT 0 NOT NULL,
    author VARCHAR REFERENCES users(username) NOT NULL,
    created_at TIMESTAMP
    );`;
}

function insertComments(commentData, articleRef) {
  //need to use utils function to convert article title to article id
  const commentToFormat = commentData.map((comment) => {
    let newComment = convertTimestampToDate(comment);

    return [
      articleRef[newComment.article_title],
      newComment.body,
      newComment.votes,
      newComment.author,
      newComment.created_at,
    ];
  });
  return format(
    `INSERT INTO comments
        (article_id, body, votes,author, created_at)
        VALUES
        %L
        RETURNING *;`,
    commentToFormat
  );
}

module.exports = {
  createTopicsQuery,
  createUsersQuery,
  createArticlesQuery,
  createCommentsQuery,
  insertTopics,
  insertUsers,
  insertArticles,
  insertComments,
};
