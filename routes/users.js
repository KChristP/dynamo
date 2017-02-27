var express = require('express');
var router = express.Router();
var auth = require('./../auth')();
var bcrypt = require('bcrypt')
const saltRounds = 10
var uuid = require('node-uuid');
var jwt = require('jwt-simple')
var cfg = require('./../config')
var User = require('./../models/user')
var Flow = require('./../models/flow')


/* GET users listing. */
router.get('/username/:id', function(req, res){
  User.get(req.params.id, function(err, user){
    if(err){
      console.log(err)
      res.json(err)
    } else {
      console.log(user)
      res.json(user.username)
    }
  })
});

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

// POST new user

router.post('/', function(req, res, cap) {

  bcrypt.hash(req.body.password, saltRounds, function(err, hash){
    var user = new User({
      'email': req.body.email,
      'UID': uuid.v1(),
      'passwordHash': hash,
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'userName': req.body.userName,
      'screenName': "*" + req.body.userName,
      'creationDate': new Date().getTime() / 1000
    });
    user.save(function(err){
      if(err){
        console.log(err);
        res.json(err)
      } else {
        console.log(`persisted user ${user.UID}`);
        var payload = {
          email: user.email,
          UID: user.UID
        };
        var token = jwt.encode(payload, cfg.jwtSecret);
        var userData = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastname,
          userName: user.userName,
          screenName: user.screenName,
          creationDate: user.creationDate,
          token: token
        };
        res.json(userData);        
      }
    })
  })
});

//PATCH - to update user info
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
