var dynamoose = require('dynamoose');

var User = dynamoose.model('users', {
  email: String,
  userid: String,
  password: String,
  firstname: String,
  lastname: String
})

module.exports = User
