const endpoints = require("../endpoints.json")

exports.getAPI = (req,res)=>{
    res.status(200).send({endpoints})
}