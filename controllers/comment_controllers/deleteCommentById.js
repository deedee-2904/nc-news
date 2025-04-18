const { removeCommentById } = require("../../models/comment_models/removeCommentById")

exports.deleteCommentById = (req,res,next)=>{
    const {comment_id}=req.params

    removeCommentById(comment_id)
    .then(()=>{
        res.status(204).send()
    })
    .catch((err)=>{
        next(err)
    })
}