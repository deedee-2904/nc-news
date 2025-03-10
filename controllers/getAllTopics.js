const { fetchAllTopics } = require("../models/fetchTopics")

exports.getAllTopics = (req,res)=>{
    fetchAllTopics().then((topics)=>{
        res.status(200).send({topics})
    })
}