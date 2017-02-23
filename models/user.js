var dynamoose = require('dynamoose');
var Schema = dynamoose.Schema
var userSchema = new Schema({
  email: {
    type: String,
    hashKey: true,
    required: true
  },
  userName: {
    type: String,
    required: true,
    index: {
      global: true,
      name: 'username-index',
      project: true,
      throughput: 5
    }
  },
  screenName: {
    type: String,
    required: true,
  },
  UID: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  twitterID: {
    type: String,
  },
  twitterKey: {
    type: String,
  },
  instagramID: {
    type: String,
  },
  instagramKey: {
    type: String,
  },
  creationDate: {
    type: Number,
    required: true
  }, 
},
{
  throughput: {read: 5, write: 5}
})

var User = dynamoose.model('users', userSchema)

module.exports = User
