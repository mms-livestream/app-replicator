var express = require("express");
var request = require("request");
var fs = require("fs");
var app = express();
//var file = "out500000_dash1.m4s";

app.put("/api/content/:contentId/:quality/:segment", function(req, res) {
  var contentId = req.params.contentId;
  var quality = req.params.quality;
  var segment = req.params.segment;

//list destination
  var lineReader = require("readline").createInterface({terminal: false,
    input: require("fs").createReadStream("dst_file.txt")
  });
  lineReader.on("line", function(line) {
    console.log(line +"/api/content" +"/" + contentId +"/" +quality +"/" +segment);

    //Redirection
    //var stream = req.pipe(request.put(line +"/api/content" +"/" +contentId +"/" +quality +"/" +segment));
    var stream = req.pipe(request.put(line +"/api/content" +"/" +contentId +"/" +quality +"/" +segment));
    stream.on("finish", function() {
      res.end();
    });

  });

/*
  var stream = req.pipe(request.put("http://localhost:8081" +"/api/content" +"/" +contentId +"/" +quality +"/" +segment));
    stream.on("finish", function() {
      res.end();
    });
  */
  //var stream = req.pipe(fs.createWriteStream(contentId+quality+segment));
});

app.put("/api/mp4/:contentId/:quality/:segment", function(req, res) {
  var contentId = req.params.contentId;
  var quality = req.params.quality;
  var segment = req.params.segment;

//list destination
  var lineReader = require("readline").createInterface({terminal: false,
    input: require("fs").createReadStream("dst_file.txt")
  });
  lineReader.on("line", function(line) {
    console.log(line +"/api/mp4" +"/" + contentId +"/" +quality +"/" +segment);

    //Redirection
    //var stream = req.pipe(request.put(line +"/api/content" +"/" +contentId +"/" +quality +"/" +segment));
    var stream = req.pipe(request.put(line +"/api/mp4" +"/" +contentId +"/" +quality +"/" +segment));
    stream.on("finish", function() {
      res.end();
    });

  });
});

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain");
  res.status(404).send("Page introuvable !!");
});

var server = app.listen(8086);
server.timeout = 100000000;
console.log("Rep_server listening on 9000");
