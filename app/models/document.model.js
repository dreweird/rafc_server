const sql = require("./db.js");
const { v4: uuidv4 } = require('uuid');
// constructor
const Document = function(document) {
  this.code = uuidv4();
  this.type = document.type;
  this.year = document.year;
  this.afc = document.afc;
  this.province = document.province;
  this.municipal = document.municipal;
  this.date_conducted = document.date_conducted;
  this.classification = document.classification;
  this.remarks = document.remarks;
  this.res_title = document.res_title;
  this.res_number = document.res_number;
  this.res_date_endorsement = document.res_date_endorsement;
  this.res_endorsed_to = document.res_endorsed_to;
  this.adopted = document.adopted;
  this.date_adopted = document.date_adopted;
};

Document.create = (newDocument, result) => {
  sql.query("INSERT INTO rafcdocuments SET ?", newDocument, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

   // console.log("created document: ", { ...newDocument });
    result(null, { ...newDocument });
  });
};

Document.findById = (documentId, result) => {
  sql.query(`SELECT * FROM rafcdocuments WHERE code = ?`,  documentId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
     // console.log("found document: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Document with the id
    result({ kind: "not_found" }, null);
  });
};

Document.getAll = result => {
  sql.query("SELECT * FROM rafcdocuments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

  //  console.log("documents: ", res);
    result(null, res);
  });
};

Document.updateById = (code, document, result) => {
  sql.query(
    "UPDATE rafcdocuments SET ? WHERE code = ?",
    [document, code],
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

      console.log("updated document: ", { id: code, ...document });
      result(null, true);
    }
  );
};

Document.remove = (id, result) => {
  sql.query("DELETE FROM rafcdocuments WHERE code = ?", id, (err, res) => {
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
    result(null, true);
  });
};

Document.findDocType = (type, result) => {
  sql.query(`SELECT * FROM rafcdocuments WHERE type = ?`,  type, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
     // console.log("found document: ", res[0]);
      result(null, res);
      return;
    }

    // not found Document with the id
    result({ kind: "not_found" }, null);
  });
};


module.exports = Document;