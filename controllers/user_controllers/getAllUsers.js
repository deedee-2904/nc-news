const { fetchAllUsers } = require("../../models/user_models/fetchAllUsers");

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers().then((users) => {
    res.status(200).send({ users });
  })
  .catch((err)=>{
    next(err)
  })
};
