module.exports = app => {
    const Documents = require("../controllers/document.controller.js");
  
    // Create a new Document
    app.post("/documents", Documents.create);
  
    // Retrieve all Documents
    app.get("/documents", Documents.findAll);
  
    // Retrieve a single Document with DocumentId
    app.get("/documents/:documentId", Documents.findOne);
  
    // Update a Document with DocumentId
    app.put("/documents/:documentId", Documents.update);
  
    // Delete a Document with DocumentId
    app.delete("/documents/:documentId", Documents.delete);

  };