var passport = require('passport')
var passportJWT = require('passport-jwt')
// var ddb = require('./db')
var User = require('./models/user')
var cfg = require('./config.js')
var ExtractJwt = passportJWT.ExtractJwt
var Strategy = passportJWT.Strategy
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
    User.get(payload.userID, function(err, user){
      if(err){
        console.log(err);
        return done(new Error("User not found"), null);
      } else {
        console.log(user);
        return done(null, {
          userID: user.userID
        });
      }
    })
    // console.log(payload);
    // ddb.getItem('userBase', payload.userID, null, {}, function(err, response, capacity) {
    //   if(err){
    //     console.log(err);
    //     return done(new Error("User not found"), null);
    //   } else {
    //     console.log('GetItem: ' + capacity);
    //     console.log(response);
    //     return done(null, {
    //       userID: response.userID
    //     });
    //   }
    // });
  });

  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};
