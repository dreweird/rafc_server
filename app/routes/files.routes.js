module.exports = app => {
    const Files = require("../controllers/files.controller.js");
  
    app.post("/add-files", Files.add);

    // Retrieve a single files with code
    app.get("/files/:code", Files.find);

    // Detached file
    app.delete("/files/:id", Files.delete);
    
  
  };