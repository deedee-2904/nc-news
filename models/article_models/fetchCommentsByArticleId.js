const db = require("../../db/connection")
const { checkExists } = require("../../db/seeds/utils")

exports.fetchCommentsByArticleId = (article_id)=>{
  return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,[article_id])
  .then(({rows})=>{
    const comments = rows
    if(!comments.length){
       return checkExists("articles","article_id",article_id)
    }
    return comments
  })  
}