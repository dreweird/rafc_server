const sql = require("./db.js");

// constructor
const Status = function(status) {
  this.code = status.code;
  this.status = status.status;
};

Status.create = (newStatus, result) => {
  sql.query("INSERT INTO rafcstatus SET ?", newStatus, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created status: ", { ...newStatus });
    result(null, { ...newStatus });
  });
};

Status.findById = (code, result) => {
  sql.query(`SELECT * FROM rafcstatus WHERE code = ?`,  code, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found status: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Status.getAll = result => {
  sql.query("SELECT * FROM rafcstatus", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Status.updateById = (id, status, result) => {
  sql.query(
    "UPDATE rafcstatus SET ? WHERE id = ?",
    [status, id],
    (err, res) => {
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
      result(null, true);
    }
  );
};

Status.remove = (id, result) => {
  sql.query("DELETE FROM rafcstatus WHERE id = ?", id, (err, res) => {
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

    console.log("deleted status with id: ", id);
    result(null, true);
  });
};



module.exports = Status;