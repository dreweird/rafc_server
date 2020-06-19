const util = require("util");
const path = require("path");
const multer = require("multer");

// var DIR = __dirname + '/../../files'; 
var DIR = __dirname + '/../../../RAFCDMS/projects/angular-ngrx-material-starter/src/assets'; 
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, DIR);
  },
  filename: (req, file, callback) => {

    const match = ["image/png", "image/jpeg", "application/pdf"];
    console.log(match.indexOf(file.mimetype));
    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg and pdf.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-rafc-${file.originalname}`;
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;