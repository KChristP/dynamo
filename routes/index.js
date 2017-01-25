var jwt = require('jwt-simple')
var express = require('express');
var router = express.Router();
var usersPractice = require('./../users')
var cfg = require('./../config')
// var ddb = require('./../db')
var User = require('./../models/user')
var bcrypt = require('bcrypt')
const saltRounds = 10


/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'User Login' });
});

//POST login info and retrieve token
router.post('/login', function(req, res) {
  if(req.body.userID && req.body.password) {
    var userID = req.body.userID;
    var password = req.body.password;
    var hash;
    User.get(userID, function(err, user){
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
              userID: userID
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

    // var options = { attributesToGet: ['userID', 'password'],
    // consistentRead: true };
    // ddb.getItem('userBase', req.body.userID, null, options, function(err, getItemResponse, cap) {
    //   if(err)
    //     console.log(err);
    //   else {
    //     console.log('GetItem: ' + cap);
    //     console.log(getItemResponse);
    //     if(userID === getItemResponse.userID){
    //       bcrypt.compare(password, getItemResponse.password, function(error, bcryptResponse){
    //         if(error){
    //           console.log(error)
    //         }
    //         if(bcryptResponse === true){
    //           var payload = {
    //             userID: userID
    //           };
    //           var token = jwt.encode(payload, cfg.jwtSecret);
    //           res.json({
    //             token: token
    //           });
    //         } else {
    //           res.send(401);
    //         }
    //       })
    //     } else {
    //       res.json('user not found')
    //     }
    //   }
    // });
    // var user = usersPractice.find(function(u) {
    //   return u.userID === userID && u.password === password;
    // });
    // if(user) {
    //   var payload = {
    //     id: user.id
    //   };
    //   var token = jwt.encode(payload, cfg.jwtSecret);
    //   res.json({
    //     token: token
    //   });
    // } else {
    //   res.send(401);
    // }
  } else {
    res.send(401);
  }
});



module.exports = router;
