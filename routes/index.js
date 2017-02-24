var jwt = require('jwt-simple')
var express = require('express');
var router = express.Router();
var usersPractice = require('./../users')
var cfg = require('./../config')
var User = require('./../models/user')
var bcrypt = require('bcrypt')
const saltRounds = 10


/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'User Login' });
});

//POST login info and retrieve token
router.post('/login', function(req, res) {
  if(req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    // var hash;
    User.get({email: req.body.email}, function(err, user){
      if(err){
        console.log("error in user.get")
        console.log(err);
        res.json(err)
      } else {
        bcrypt.compare(password, user.passwordHash, function(error, bcryptResponse){
          if(error){
            console.log(error)
            res.json(error)
          }
          if(bcryptResponse === true){
            var payload = {
              email: email
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
            }
            res.json(userData);
            
          } else {
            console.log("Incorrect password")
            res.send(401);
          }
        })
      }
    })
  } else {
    console.log("please provide a valid email and password")
    res.send(401);
  }
});



module.exports = router;
