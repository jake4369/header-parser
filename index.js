// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/whoami", (req, res) => {
  try {
    const ipaddress = req.ip;
    const language = req.headers["accept-language"];
    const software = req.headers["user-agent"];

    if (
      ipaddress === undefined ||
      language === undefined ||
      software === undefined
    ) {
      return res.status(400).json({ message: "Missing necessary header data" });
    }

    res.status(200).json({
      ipaddress,
      language,
      software,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
