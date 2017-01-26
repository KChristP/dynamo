#Users API:

##Authentication:
Uses JSON web token authentication strategy using passport-jwt library @ https://github.com/themikenicholson/passport-jwt

Login workflow:
1. Send POST request to /token that includes a username and password in the body
2. If authenticated, server will respond with a json token - (generated from the user's ID and a secret hash stored on the server in config.js)
3. Front end needs to save that token and put it in the header of any requests to restricted resources, (if the fromAuthHeader() extractor is used, it will be formatted like this - Authentication: JWT e309dlkdja9ExampleToken394dlkfaj)
4. The server will respond 401 to any requests without a valid token

##Dynamodb Driver
Currently uses this library https://github.com/totemstech/node-dynamodb to simplify database queries

##Models (not yet implemented)
planning to use dynamoose library https://github.com/automategreen/dynamoose
another good option is vogels - similar but syntax is more SQL like...


ssh to db:
ssh -i ddbkey.pem ubuntu@ec2-52-23-186-224.compute-1.amazonaws.com

to run server: (use forever so it doesnt close when you close your ssh window)
forever start bin/www

