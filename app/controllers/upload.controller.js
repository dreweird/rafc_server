const upload = require("../models/upload.model.js");
const fs = require('fs');

const multipleUpload = async (req, res) => {
    try {
      await upload(req, res);
      console.log(req.files);
  
      if (req.files.length <= 0) {
        return res.send({
            success: true,
            text: 'No files selected!'
          })
      }
  
      return res.send({
        success: true,
        file_name: req.files[0].filename
      })
    } catch (error) {
      
      console.log(error);
  
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send({
            success: false,
            text: 'Too many files to upload!'
          })
      }
      return res.send({
        success: true,
        text: `Error when trying upload many files: ${error}`
      })
    }
};

const deleteUploadedFile = async (req, res) => {
  try {
    var path = __dirname + '/../../../RAFCDMS/projects/angular-ngrx-material-starter/src/assets/' + req.params.filename; 
    fs.unlinkSync(path);
    console.log('file deleted');
    return res.send(true);
  } catch(err) {
    console.error(err);
    return res.send(false);
  }
};
  
  module.exports = {
    multipleUpload: multipleUpload,
    deleteUploadedFile: deleteUploadedFile
  };