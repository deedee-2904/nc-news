const db = require("../../db/connection")

exports.fetchUserByUsername = (username)=>{
    return db.query(`SELECT * FROM users WHERE username = $1`,[username])
    .then(({rows})=>{
        if(!rows.length){
            return Promise.reject({status:404, msg:`No user found with the username: ${username}`})
        }
        return rows[0]
    })
}