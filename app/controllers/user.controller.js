const User = require("../models/user.model.js");


exports.login = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.login(req.body.username, req.body.password, (err, data) => {
    console.log(data);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while authenticating."
      });
      if(data){
        res.send({user_id: data[0].id, username: data[0].username, isAdmin: data[0].isAdmin});
      }else{
        res.status(401).json('Invalid Username or Password');
      }

  });
};


