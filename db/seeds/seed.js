const db = require("../connection");
const {createRef} = require('./utils')

const {
  // createTopicsQuery,
  // createUsersQuery,
  // createArticlesQuery,
  // createCommentsQuery,
  insertTopics,
  insertUsers,
  insertArticles,
  insertComments,
} = require("./seed_functions");
const manageTables = require("../manageTables");

const seed = ({ topicData, userData, articleData, commentData }) => {
  
  return manageTables()
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
      const articleRef = createRef(insertedArticles,"title","article_id")
      return db.query(insertComments(commentData,articleRef));
    })

};

module.exports = seed;
