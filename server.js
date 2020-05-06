var express = require("express");
var app = express();
var path = require("path");

// viewed at http://localhost:8080/
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/data", function (req, res) {
  res.sendFile(path.join(__dirname + "/Covid-19-json.json"));
});

app.listen(8080, () => {
  console.log("Routes.js running !");
});
