var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("search");
});

app.get("/results", function(req, res) {
  var query = req.query.search;
  var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb ";
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body); // JSON.parse gives the object form
      res.render("results", { data: data });
    }
  });
});

//For listening in the local server
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Movie App Has Started!");
});
