var dynamoose = require('dynamoose');

var User = dynamoose.model('users', {
  userid: String,
  password: String,
  email: String,
  firstname: String,
  lastname: String
})

module.exports = User
