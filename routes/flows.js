var express = require('express');
var router = express.Router();
var auth = require('./../auth')();
var User = require('./../models/flow');
var uuid = require('node-uuid');

// GET flows


router.get('/flows/:id', auth.authenticate(), function(req, res) {
  console.log('get request:', req.params.id);
  Flow.get(req.params.id, function(err, user){
    if(err)
      console.log(err);
    else {
      console.log(flow);
      res.json(flow);
    }
  })
});


// POST a new flow
router.post('/flows', auth.authenticate(), function(req, res) {
	
})