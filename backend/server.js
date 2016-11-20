var fetch = require("node-fetch");
var express = require('express')
var app = express()



var XEAC_URL = "http://data.library.amnh.org:8082/";
var XEAC_PATHS = {
  SEARCH: "orbeon/xeac/results/?q=${query}%20AND%20entityType_facet:%22person%22"
}

app.get('/people', function (req, res) {
  var responseJson = [];
  var url = XEAC_URL+XEAC_PATHS.SEARCH.replace("${query}",encodeURIComponent(req.query.term));
  console.log("Sending to URL: "+url);
  fetch(url)
    .then(function(response){
      response.text().then(function(text){
        res.send(text);
        res.end();
      })
      res.set({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/html"
      });
    }).catch(function(err){
      console.error(err);
      res.send("Didnt work")
    })

/*
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    res.set("Access-Control-Allow-Origin","*");
    res.send( this.responseText );
  });
  xhr.open( "GET", XHEAC_URL+XEAC_PATHS.search.replace("${query}",encodeURIComponent(req.query.term)), true, "guest","hackathon" );
  */
})

app.listen(3000)
