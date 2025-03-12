const { fetchAllArticles } = require("../../models//article_models/fetchAllArticles")

exports.getAllArticles = (req,res,next)=>{
    fetchAllArticles().then((articles)=>{
        res.status(200).send({articles})
    })
}