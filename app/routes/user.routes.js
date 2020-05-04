module.exports = app => {
    const Users = require("../controllers/user.controller.js");
  
    // Authenticate the user
    app.post("/login", Users.login);
  
  };