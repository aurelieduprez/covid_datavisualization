//express pour gérer le server
var express = require("express");
var app = express();
var path = require("path");
const jsonQuery = require("json-query");

//import dossier stylesheet
app.use("/style", express.static("./style/"));

//affichage index.html en page principale
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

//json
app.get("/data", function (req, res) {
  res.sendFile(path.join(__dirname + "/Covid-19-json.json"));
});

//requete cas France en mars
app.get("/franceCasesMarch", function (req, res) {
  var data = require("./Covid-19-json.json");
  var query = jsonQuery(
    "records[*countriesAndTerritories=France & dateRep=30/03/2020].cases",
    {
      data: data,
    }
  ).value;
  res.send(query);
});

//requete cas monde en mars
app.get("/worldCasesMarch", function (req, res) {
  var data = require("./Covid-19-json.json");
  var query = jsonQuery("records[*dateRep=30/03/2020].cases", {
    data: data,
  }).value;
  res.send(query);
});

//requete morts France en mars
app.get("/franceDeathsMarch", function (req, res) {
  var data = require("./Covid-19-json.json");
  var query = jsonQuery(
    "records[*countriesAndTerritories=France & dateRep=30/03/2020].deaths",
    {
      data: data,
    }
  ).value;
  res.send(query);
});

//requete morts dans le monde en mars
app.get("/worldDeathsMarch", function (req, res) {
  var data = require("./Covid-19-json.json");
  var query = jsonQuery("records[*dateRep=30/03/2020].deaths", {
    data: data,
  }).value;
  res.send(query);
});

//récupérer les jours enregistrés en France
app.get("/getDaysFrance", function (req, res) {
  var data = require("./Covid-19-json.json");
  var query = jsonQuery("records[*countriesAndTerritories=France].dateRep", {
    data: data,
  }).value;
  res.send(query);
});

//tous les cas en France
app.get("/franceCases", function (req, res) {
  var data = require("./Covid-19-json.json");
  var query = jsonQuery("records.[*countriesAndTerritories=France].cases", {
    data: data,
  }).value;
  res.send(query);
});

//morts en France
app.get("/franceDeaths", function (req, res) {
  var data = require("./Covid-19-json.json");
  var query = jsonQuery("records.[*countriesAndTerritories=France].deaths", {
    data: data,
  }).value;
  res.send(query);
});

//pays de chaque continent
app.get("/ContinentCountries", function (req, res) {
  var data = require("./country-by-continent.json");
  var query = jsonQuery(`[*continent=${req.query.continent}].country`, {
    data: data,
  }).value;
  res.send(query);
});

//cas du pays
app.get("/CountryCases", function (req, res) {
  var data = require("./Covid-19-json.json");
  correctCountryFormat = req.query.country.split(" ").join("_");
  var query = jsonQuery(
    `records[*countriesAndTerritories=${correctCountryFormat}].cases`,
    {
      data: data,
    }
  ).value;
  res.send(query);
});

//morts du pays
app.get("/CountryDeaths", function (req, res) {
  var data = require("./Covid-19-json.json");
  correctCountryFormat = req.query.country.split(" ").join("_");
  var query = jsonQuery(
    `records[*countriesAndTerritories=${correctCountryFormat}].deaths`,
    {
      data: data,
    }
  ).value;
  res.send(query);
});

//localhost:8080
app.listen(8080, () => {
  console.log("server.js running !");
});
