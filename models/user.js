var dynamoose = require('dynamoose');

var User = dynamoose.model('users', {
  email: String,
  userid: String,
  password: String,
  firstname: String,
  lastname: String,
  // twitterID: String,
  // twitterKey: String,
  // InstagramID: String,
  // InstagramKey: String,
  // creationDate: Number

})

module.exports = User
