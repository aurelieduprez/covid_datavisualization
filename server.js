var express = require("express");
var app = express();
var path = require("path");
const jsonQuery = require("json-query");

app.use("/style", express.static("./style/"));

// viewed at http://localhost:8080/
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/data", function (req, res) {
  res.sendFile(path.join(__dirname + "/Covid-19-json.json"));
});

app.get("/franceCases", function (req, res) {
  var data = require("./Covid-19-json.json");
  var query = jsonQuery("records[*countriesAndTerritories=France].cases", {
    data: data,
  }).value; //=> {value: 'Matt', parents: [...], key: 0} ... etc
  res.send(query);
});

app.get("/worldCases", function (req, res) {
  var data = require("./Covid-19-json.json");
  var query = jsonQuery("records.cases", {
    data: data,
  }).value; //=> {value: 'Matt', parents: [...], key: 0} ... etc
  res.send(query);
});

app.listen(8080, () => {
  console.log("Routes.js running !");
});
