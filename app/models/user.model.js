const sql = require("./db.js");

// constructor
const Users = function(user) {
  this.usermame = user.username;
  this.password = user.password;
};

Users.login = (username, pwd, result) => {

  sql.query("SELECT * FROM usertable where username = ? and password = ?", [username, pwd], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if(res.length > 0) {
      console.log("Users successfully login: ");
      result(null, res);
    } else {
      console.log("Users failed login: ");
      result(err, false);
    }

  });
};



module.exports = Users;