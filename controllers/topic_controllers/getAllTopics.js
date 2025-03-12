const { fetchAllTopics } = require("../../models/topic_models/fetchAllTopics")

exports.getAllTopics = (req,res)=>{
    fetchAllTopics().then((topics)=>{
        res.status(200).send({topics})
    })
}