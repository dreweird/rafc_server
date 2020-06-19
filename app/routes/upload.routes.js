module.exports = app => {
    const uploadController = require("../controllers/upload.controller.js");
  
    app.post("/multiple-upload", uploadController.multipleUpload);

    app.delete("/delete-uploaded-file/:filename", uploadController.deleteUploadedFile);
  };