const db = require("../connection");
const {createRef} = require('./utils')

const {
  createTopics,
  createUsers,
  createArticles,
  createComments,
  insertTopics,
  insertUsers,
  insertArticles,
  insertComments,
} = require("./seed_functions");

//could be refactored to move all the drop tables and functions to their own files?

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return db.query(createTopics());
    })
    .then(() => {
      return db.query(createUsers());
    })
    .then(() => {
      return db.query(createArticles());
    })
    .then(() => {
      return db.query(createComments());
    })
    .then(() => {
      return db.query(insertTopics(topicData));
    })
    .then(() => {
      return db.query(insertUsers(userData));
    })
    .then(() => {
      return db.query(insertArticles(articleData));
    })
    .then(({rows}) => {
      const insertedArticles = rows
      console.log(insertedArticles,"<<<< articles")
      const articleRef = createRef(insertedArticles,"title","article_id")
      return db.query(insertComments(commentData,articleRef));
    })

};

module.exports = seed;
