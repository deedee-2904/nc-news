const db = require("../../db/connection");

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
