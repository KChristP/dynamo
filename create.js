// var AWS = require("aws-sdk");
//
// AWS.config.update({
//   region: "us-east-1",
//   endpoint: "https://dynamodb.us-east-1.amazonaws.com"
// });
//
// var docClient = new AWS.DynamoDB.DocumentClient();
//
// var table = "userBase";
//
// var username = "daffy";
// var password = "theduck";
//
// var params = {
//     TableName:table,
//     Item:{
//         "userID": username,
//         "password": password,
//     }
// };
//
// console.log("Adding a new item...");
// docClient.put(params, function(err, data) {
//     if (err) {
//         console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Added item:", JSON.stringify(data, null, 2));
//     }
// });
