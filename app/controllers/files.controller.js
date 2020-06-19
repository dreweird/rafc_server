const Files = require("../models/files.model.js");

exports.add = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
   // console.log(req.body);
    var file = req.body.newFile;
    // Create a File to submit
    const new_file = new Files({
      rafc_code : file.rafc_code,
      file_name: file.file_name,
      date_uploaded : new Date()
    });
  
    // Save Document in the database
    Files.add(new_file, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding files."
        });
      else res.send(data);
    });
};

// Find a single Document with a code
exports.find = (req, res) => {
  Files.find(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No attached files found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving files with code " + req.params.code
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Files.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Document with id ${req.params.id}.`, success: false
        });
      } else {
        res.status(500).send({
          message: "Could not delete Document with id " + req.params.id, success: false
        });
      }
    } else res.send({ message: `Detached file successfully!`, success: true });
  });
};