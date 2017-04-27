/*jslint node: true */
/*jshint esversion: 6 */
"use strict";

let fs = require("fs");
let request = require("request");
let express = require("express");
let arr = {'1':['http://127.0.0.1:8087']}; // Default json

module.exports = options => {
  let service = options.service;
  let router = express.Router();

  router.post("/manage/location", function(req, res) {
    console.log("rcv put");
    arr = req.body;
    // console.log(arr);
    // console.log(arr[1][0]);
  });

  router.put("/content/:contentId/:quality/:segment", function(req, res) {
    var contentId = req.params.contentId;
    var quality = req.params.quality;
    var segment = req.params.segment;
    var dst = arr[contentId];

    //Redirection
    for (let i = 0; i < dst.length; i++) {
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
