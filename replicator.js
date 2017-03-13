var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express();
var file = './content/148469/out148469_dash1.m4s'

app.get('/api/content/:id/:quality/:segment', function(req, res) {
  var extension = req.params.segment.split(".")[1];
  var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./dstFile.txt')
  });
  lineReader.on('line', function (line) {
    console.log(line);
    if (extension == 'mp4') {
      // req.pipe(fs.createWriteStream('content.mp4')); pour quand Saad m'enverra les content
      fs.createReadStream(file).pipe(request.put(line + '/api/mp4' + '/' + req.params.id + '/' + req.params.quality + '/' + req.params.segment));
    } else if (extension == 'm4s') {
      // req.pipe(fs.createWriteStream('content.m4s')); pour quand Saad m'enverra les content
      fs.createReadStream(file).pipe(request.put(line + '/api/content' + '/' + req.params.id + '/' + req.params.quality + '/' + req.params.segment));
    }
  });
  res.end('Aller la !!');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !!');
});

app.listen(8080, '127.0.0.1')
console.log('Rep_server listening on 127.0.0.1:8080');
