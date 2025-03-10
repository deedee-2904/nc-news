const db = require("../db/connection")

exports.fetchAllArticles = ()=>{
    // We need may have to join the articles table with the comments id where there's a matching article_id
    // We need to select all coloumns excluding the body when we return the array of objects 

    //SELECT * FROM articles, COUNT(article_id) AS comment_count
    //FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id
    //GROUP BY article_id
    return db.query(`SELECT COUNT(articles.article_id) AS comment_count FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id`).then(({rows})=>{ // only returns comment counts and doesn't like select all notataion
        console.log(rows) // only returns comment
        return rows
    })
}