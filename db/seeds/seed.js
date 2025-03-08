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

//could be refactored to move all the drop tables and functions to their own files?
//rename functions or resolve query in them, names are a bit decieveing.

const seed = ({ topicData, userData, articleData, commentData }) => {
  
  return manageTables()

  // return db
  //   .query(`DROP TABLE IF EXISTS comments;`)
  //   .then(() => {
  //     return db.query(`DROP TABLE IF EXISTS articles;`);
  //   })
  //   .then(() => {
  //     return db.query(`DROP TABLE IF EXISTS users;`);
  //   })
  //   .then(() => {
  //     return db.query(`DROP TABLE IF EXISTS topics;`);
  //   })
  //   .then(() => {
  //     return db.query(createTopicsQuery())
  //   })
  //   .then(() => {
  //     return db.query(createUsersQuery());
  //   })
  //   .then(() => {
  //     return db.query(createArticlesQuery());
  //   })
  //   .then(() => {
  //     return db.query(createCommentsQuery());
  //   })
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
      // console.log(insertedArticles,"<<<< articles")
      const articleRef = createRef(insertedArticles,"title","article_id")
      return db.query(insertComments(commentData,articleRef));
    })

};

module.exports = seed;
