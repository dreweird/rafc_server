const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();



app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RAFC." });
});



require("./app/routes/document.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/upload.routes.js")(app);
require("./app/routes/files.routes.js")(app);
require("./app/routes/status.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;

// var httpsServer = https.createServer(options, app);

app.listen(PORT, 'localhost', console.log(`Server listening on port: ${PORT}`));


