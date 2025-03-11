exports.psqlErrorHandler=(err,req,res,next)=>{
    console.log(err,"<<<< coming from beyond")
    if(err.code === "22P02"||"23503"){
        res.status(400).send({msg: "Bad Request"})
    }else next(err)
}