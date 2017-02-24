var express = require('express');
var router = express.Router();
var auth = require('./../auth')();
var Flow = require('./../models/flow');
var uuid = require('node-uuid');

// GET flows


router.get('/flows/:id', auth.authenticate(), function(req, res) {
  console.log('get request:', req.params.id);
  Flow.get(req.params.id, function(err, flow){
    if(err)
      console.log(err);
    else {
      console.log(flow);
      res.json(flow);
    }
  })
});


// POST a new flow
router.post('/', auth.authenticate(), function(req, res, cap) {
  let date = new Date().getTime() / 1000;
	flow = new Flow({
    flowUID: uuid.v1(),
    authorUID: req.body.userID,
    title: req.body.title,
    description: req.body.description,
    version: req.body.userID,
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