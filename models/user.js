var dynamoose = require('dynamoose');

var User = dynamoose.model('userBase', {
  userID: String,
  password: String,
  someotherdata: String
})

module.exports = User
