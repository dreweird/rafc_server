module.exports = app => {
    
    const Status = require("../controllers/status.controller.js");

    app.post("/status", Status.create);
    app.get("/status/:code", Status.findOne);
    app.put("/status/:id", Status.update);
    app.delete("/status/:id", Status.delete);

  };