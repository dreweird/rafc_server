const User = require("../models/user.model.js");


exports.login = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.login(req.body.email, req.body.password, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while authenticating."
      });
    else res.send(data);
  });
};


