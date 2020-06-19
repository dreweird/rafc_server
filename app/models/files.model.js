const sql = require("./db.js");

// constructor
const Files = function(file) {
  this.rafc_code = file.rafc_code;
  this.file_name = file.file_name;
  this.date_uploaded = file.date_uploaded;
};

Files.add = (newFiles, result) => {
    sql.query("INSERT INTO rafcfiles SET ?", newFiles, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("files added: ", { ...newFiles });
      result(null, { ...newFiles });
    });
  };

  Files.find = (code, result) => {
    sql.query(`SELECT * FROM rafcfiles WHERE rafc_code = ?`,  code, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  Files.delete = (id, result) => {
    sql.query("DELETE FROM rafcfiles WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Document with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted attached files with id: ", id);
      result(null, true);
    });
  };

  module.exports = Files;