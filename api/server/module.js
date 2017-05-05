/*jslint node: true */
/*jshint esversion: 6 */
"use strict";

let fs = require("fs");
let request = require("request");
let express = require("express");
let arr; //= {'1':['http://192.168.2.130:8087','http://192.168.2.100:8087']}; // Default json
let dst;

module.exports = options => {
  let service = options.service;
  let router = express.Router();

  router.post("/manage/location", function(req, res) {
    console.log("rcv put");
    arr = req.body;
    console.log(arr);
  });


 


  router.put("/content/:contentId/:quality/:segment", function(req, res) {
    var contentId = req.params.contentId;
    var quality = req.params.quality;
    var segment = req.params.segment;
    
    if (arr[contentId] == undefined){ 
      dst = arr['new'];
    }else{   
      dst = arr[contentId];
    }
    
  
    //Redirection
    for (let i = 0; i < dst.length ; i++) {
      console.log(dst[i] +"/api/content" +"/" + contentId +"/" +quality +"/" +segment);
      var stream = req.pipe(request.put(dst[i] +"/api/content" +"/" +contentId +"/" +quality +"/" +segment));
    }
    stream.on("finish", function() {
      res.end('res.end');
    });
  });

  router.put("/mp4/:contentId/:quality/:segment", function(req, res) {
    let contentId = req.params.contentId;
    let quality = req.params.quality;
    let segment = req.params.segment;
    var dst = arr[contentId];

    if (arr[contentId] == undefined){ 
      dst = arr['new'];
    }else{   
      dst = arr[contentId];
    }

    //Redirection
    for (let i = 0; i < dst.length; i++) {
      console.log(dst[i] +"/api/mp4" +"/" + contentId +"/" +quality +"/" +segment);
      var stream = req.pipe(request.put(dst[i] +"/api/mp4" +"/" +contentId +"/" +quality +"/" +segment));
    }
    stream.on("finish", function() {
      res.end('res.end');
    });
  });

  router.timeout = 100000000;
  return router;
};
