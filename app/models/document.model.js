const sql = require("./db.js");

// constructor
const Document = function(document) {
  this.id = document.id;
  this.name = document.name;
  this.description = document.description;
};

Document.create = (newDocument, result) => {
  sql.query("INSERT INTO documents SET ?", newDocument, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created document: ", { id: res.insertId, ...newDocument });
    result(null, { id: res.insertId, ...newDocument });
  });
};

Document.findById = (documentId, result) => {
  sql.query(`SELECT * FROM documents WHERE id = ?`,  documentId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found document: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Document with the id
    result({ kind: "not_found" }, null);
  });
};

Document.getAll = result => {
  sql.query("SELECT * FROM documents", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("documents: ", res);
    result(null, res);
  });
};

Document.updateById = (id, document, result) => {
  sql.query(
    "UPDATE documents SET name = ?, description = ? WHERE id = ?",
    [document.name, document.description, id],
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

      console.log("updated document: ", { id: id, ...document });
      result(null, { id: id, ...document });
    }
  );
};

Document.remove = (id, result) => {
  sql.query("DELETE FROM document WHERE id = ?", id, (err, res) => {
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

    console.log("deleted document with id: ", id);
    result(null, res);
  });
};



module.exports = Document;