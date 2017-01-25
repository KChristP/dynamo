var express = require('express');
var router = express.Router();
// var ddb = require('./../db');
var auth = require('./../auth')();
var bcrypt = require('bcrypt')
const saltRounds = 10
var User = require('./../models/user')


/* GET users listing. */

router.get('/new', function(req, res) {
  res.render('new', { title: 'New User' });
});

router.get('/:id', auth.authenticate(), function(req, res) {
  console.log('get request:', req.params.id);
  User.get(req.params.id, function(err, user){
    if(err)
      console.log(err);
    else {
      console.log(user);
      res.json(user);
    }
  })
});

// POST

router.post('/new', function(req, res, cap) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash){
    var user = new User({
      'userID': req.body.userid,
      'password': hash,
      'someotherdata': req.body.someotherdata
    });
    user.save(function(err){
      if(err){
        console.log(error);
        res.json(error)
      } else {
        console.log(`persisted user ${user.userID}`);
        res.json(user)
      }
    })
  })
});

//PATCH - to update user info - holding off on configuring until I have a better idea what the data will look like for updates to user info
router.patch('/:id', auth.authenticate(), function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash){
    var user = {
      $PUT: {
        'password': hash,
        'someotherdata': req.body.someotherdata,
      },
    }
    User.update(req.params.id, user, function(err){
      if(err){
        console.log(err);
        res.json(err)
      } else {
        console.log(user);
        res.json(user)
      }
    });
  })
});


//DELETE
router.delete('/:id', auth.authenticate(), function(req, res) {
  User.delete(req.params.id, function(err){
    if(err){
      console.log(err);
      res.json(err)
    } else {
      console.log(`destroyed user ${req.params.id}`);
      res.json(`destroyed user ${req.params.id}`)
    }
  })
});


module.exports = router;
