var fs = require('fs');
var request = require('request');
var express = require('express');
var app = express();

var dst_file = './dst_file.txt';

app.put('/api', function(req, res) {

  var contentId = req.query.contentId;
  var quality = req.query.quality;
  var segment = req.query.segment;

  // Simulation MPD
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(dst_file)
  });
  lineReader.on('line', function (line) {
    // Send m4s
    console.log(line + '/api/content/'+contentId+"/"+quality+"/"+ segment);
    fs.createReadStream(contentId+"/"+quality+"/"+segment).pipe(request.put(line +'/api/content/'+contentId+"/"+quality+"/"+ segment));
    // req.pipe(request.put(line + '/api/content/'+contendId+"/"+quality+"/"+ segment));

  });
  res.end();
});
app.listen(8080);


console.log('Replicator listening on 127.0.0.1:8080');
