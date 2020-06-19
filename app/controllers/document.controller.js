const Document = require("../models/document.model.js");

// Create and Save a new Document
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var document = req.body.entries;
  // Create a Document
  const new_doc = new Document({
    type : document.type,
    year : document.year,
    afc : document.afc,
    province : document.province,
    municipal : document.municipal,
    date_conducted : new Date(document.date_conducted),
    classification : document.classification,
    remarks : document.remarks,
    res_title: document.res_title,
    res_number: document.res_number,
    res_date_endorsement: new Date(document.res_date_endorsement),
    res_endorsed_to: document.res_endorsed_to,
    adopted: document.adopted,
    date_adopted: new Date(document.date_adopted)


  });

  // Save Document in the database
  Document.create(new_doc, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Document."
      });
    else res.send(data);
  });
};

// Retrieve all Documents from the database.
exports.findAll = (req, res) => {
  Document.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Documents."
      });
    else res.send(data);
  });
};

// Find a single Document with a DocumentId
exports.findOne = (req, res) => {
  Document.findById(req.params.documentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Document with id ${req.params.DocumentId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Document with id " + req.params.DocumentId
        });
      }
    } else res.send(data);
  });
};

// Update a Document identified by the DocumentId in the request
exports.update = (req, res) => {
  // Validate Request
  console.log("controller", req.body.entries);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Document.updateById(
    req.params.documentId,
    new Document(req.body.entries),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Document with id ${req.params.DocumentId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Document with id " + req.params.DocumentId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Document with the specified DocumentId in the request
exports.delete = (req, res) => {
  console.log(req.params);
  Document.remove(req.params.documentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Document with id ${req.params.documentId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Document with id " + req.params.documentId
        });
      }
    } else res.send({ message: `Document was deleted successfully!` });
  });
};

// Find document type
exports.DocType = (req, res) => {
  Document.findDocType(req.params.type, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Document with type ${req.params.type}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Document with type " + req.params.type
        });
      }
    } else res.send(data);
  });
};
