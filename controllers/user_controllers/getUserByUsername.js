const { fetchUserByUsername } = require("../../models/user_models/fetchUserByUsername")

exports.getUserByUsername = (req,res,next)=>{
    const {username} = req.params

    fetchUserByUsername(username)
    .then((user)=>{
        res.status(200).send({user})
    })
    .catch((err)=>{
        next(err)
    })
}