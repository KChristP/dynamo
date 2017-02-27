var express = require('express');
var router = express.Router();
var auth = require('./../auth')();
var Flow = require('./../models/flow');
var uuid = require('node-uuid');


// GET flows


router.get('/', auth.authenticate(), function(req, res) {
  var token = req.headers.authorization.slice(4)
  var parseJwt = function(jwt) {
        var base64Url = jwt.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(new Buffer(base64, 'base64').toString('binary') );
  };
  var authorUID = parseJwt(token).UID
  Flow.query({authorUID: {eq: authorUID}}, function(err, flows){
    if(err)
      console.log(err);
    else {
      console.log(flows)
      res.json(flows);
    }
  })
});

// router.get('/', auth.authenticate(), function(req, res) {
//   log('inside get')
//   let token = req.headers.authorization

// });

// POST a new flow
router.post('/', auth.authenticate(), function(req, res, cap) {
   var date = new Date().getTime() / 1000;
   var flow = new Flow({
    flowUID: uuid.v1(),
    authorUID: req.body.authorUID,
    title: req.body.title,
    description: req.body.description,
    version: ("0.1"),
    modificationDate: date,
    creationDate: date,
    viewsCount: 0,
    sharesCount: 0,
    likesCount: 0,
    commentsCount: 0, 
    presentation: req.body.presentation
  });
  flow.save(function(err){
    if(err){
      console.log(err)
    } else {
      console.log("persisted flow " + flow.flowUID)
      res.json({
        flow
      })
    }
  });
});

module.exports = router;
