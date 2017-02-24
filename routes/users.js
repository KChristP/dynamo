var express = require('express');
var router = express.Router();
var auth = require('./../auth')();
var bcrypt = require('bcrypt')
const saltRounds = 10
var User = require('./../models/user')
var uuid = require('node-uuid');
var jwt = require('jwt-simple')
var cfg = require('./../config')
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

// POST

router.post('/', function(req, res, cap) {
  console.log("this is the request body:", req.body)
    console.log("this is the request headers:", req.headers)

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
          email: req.body.email
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
        Flow.get(user.UID, function(err, flows){
          if(err)
            console.log(err);
          else {
            console.log(flows);
            res.json(Object.assign({}, userData, flows));
          }          
        })
        res.json();        
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
