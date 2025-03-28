const db = require("../../db/connection");
const format = require("pg-format");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arrOfObjs, key1, key2) => {
  let lookupObj = {};

  arrOfObjs.forEach((object) => {
    return (lookupObj[object[key1]] = object[key2]);
  });

  return lookupObj;
};

exports.checkExists = (table, column, value) => {
  const queryStr = format(`SELECT * FROM %I WHERE %I = $1`, table, column);
  return db.query(queryStr, [value]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: `${column} Not Found` });
    }
    return true
  })
};
