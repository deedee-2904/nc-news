const db = require("./db/connection");

const query1 = db;

query1
  .query(`SELECT * FROM users`)
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => {
    console.log(err);
  });

const query2 = db;

query2
  .query(`SELECT * FROM articles WHERE topic = 'coding'`)
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => {
    console.log(err);
  });

const query3 = db;

query3
  .query(`SELECT * FROM comments WHERE votes < 0`)
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => {
    console.log(err);
  });

const query4 = db;

query4
  .query(`SELECT * FROM topics`)
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => {
    console.log(err);
  });

const query5 = db;

query5
  .query(`SELECT * FROM articles WHERE author = 'grumpy19'`)
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => {
    console.log(err);
  });

  const query6 = db;

  query6
    .query(`SELECT * FROM comments WHERE votes > 10`)
    .then((res) => {
      console.log(res.rows);
    })
    .catch((err) => {
      console.log(err);
    });
