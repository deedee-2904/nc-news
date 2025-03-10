const app = require("./app")

app.listen(8080,(err)=>{
    if(err){
        throw err
    } else{
        console.log("listening at 8080")
    }
})