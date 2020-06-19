const Status = require("../models/status.model.js");


exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var body = req.body.status;

  const new_status = new Status({
    code : body.code,
    status : body.status
  });

  Status.create(new_status, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the status.",
        success: false
      });
    else res.send({success: true});
  });
};


exports.findOne = (req, res) => {
  Status.findById(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No status found`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving status with id " + req.params.code
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Status.updateById(
    req.params.id,
    new Status(req.body.status),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found status with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating status with id " + req.params.id
          });
        }
      } else res.send({success: true});
    }
  );
};

exports.delete = (req, res) => {

  Status.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found status with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete status with id " + req.params.id
        });
      }
    } else res.send({ success: true, message: `status was deleted successfully!` });
  });
};

