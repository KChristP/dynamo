var dynamoose = require('dynamoose');
var Schema = dynamoose.Schema
var flowSchema = new Schema({
  flowUID: {
		hashKey: true,
    type: String,
    required: true
  },
  authorUID: {
    type: String,
    required: true,
		index: {
      global: true,
      name: 'authorID-index',
      project: true,
      throughput: 5
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  versionrstName: {
    type: String,
    required: true
  },
  modificationDate: {
    type: String,
    required: true
  },
  creationDate: {
    type: String,
		required: true
  },
  viewsCount: {
    type: String,
  },
  sharesCount: {
    type: String,
  },
  likesCount: {
    type: String,
  },
  commentsCount: {
    type: Number,
  }, 
	presentation: {
		type: Object,

	}
},
{
  throughput: {read: 5, write: 5}
})

var Flow = dynamoose.model('flows', flowSchema)

module.exports = Flow
