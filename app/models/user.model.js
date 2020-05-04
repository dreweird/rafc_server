const sql = require("./db.js");

// constructor
const Users = function(user) {
  this.email = user.email;
  this.password = user.password;
};

Users.login = (email, pwd, result) => {

  sql.query("SELECT * FROM users where email = ? and password = ?", [email, pwd], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if(res.length > 0) {
      console.log("Users successfully login: ");
      result(null, true);
    } else {
      console.log("Users failed login: ");
      result(null, false);
    }

  });
};



module.exports = Users;