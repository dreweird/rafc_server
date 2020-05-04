const Document = require("../models/document.model.js");

// Create and Save a new Document
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  // Create a Document
  const new_doc = new Document({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description
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
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(111, req.body);

  Document.updateById(
    req.params.documentId,
    new Document(req.body),
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

