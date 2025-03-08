const db = require("./connection");
const {
  createTopicsQuery,
  createUsersQuery,
  createArticlesQuery,
  createCommentsQuery
} = require("./seeds/seed_functions");

async function manageTables(){
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS articles;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);

  await db.query(createTopicsQuery());
  await db.query(createUsersQuery());
  await db.query(createArticlesQuery());
  await db.query(createCommentsQuery());
};

module.exports = manageTables
