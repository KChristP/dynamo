var jwt = require('jwt-simple')
var express = require('express');
var router = express.Router();
var usersPractice = require('./../users')
// var cfg = require('./../config')
var User = require('./../models/user')
var bcrypt = require('bcrypt')
const saltRounds = 10


/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'User Login' });
});

//POST login info and retrieve token
router.post('/login', function(req, res) {
  if(req.body.userid && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    // var hash;
    User.get(userid, function(err, user){
      if(err){
        console.log(err);
        res.json(err)
      } else {
        bcrypt.compare(password, user.password, function(error, bcryptResponse){
          if(error){
            console.log(error)
            res.json(error)
          }
          if(bcryptResponse === true){
            var payload = {
              userid: userid
            };
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.json({
              token: token
            });
          } else {
            res.send(401);
          }
        })
      }
    })
  } else {
    res.send(401);
  }
});



module.exports = router;
