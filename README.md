# API Endpoints:

## /login
### GET (returns html form to input username and password)
```
curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" "http://localhost:3000/login"
```
### POST (returns a JSON Web Token(JWT) for authentication if credentials are in the database)
```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'userid=jello&password=itsalive' "http://localhost:3000/login"
```

## /users/new
### GET (returns html form to input username and password)
```
curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" "http://localhost:3000/users/new"
```
### POST (adds user and password hash into the database, returns json of the server response)
```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'userid=username&password=password&someotherdata={someData: "stored here"}' "http://localhost:3000/users/new"
```

## /users/:id
### GET (RESTRICTED by JWT, returns json of all user data in the database)
```
curl -X GET -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJqZWxsbyJ9.TPTs0irsJGFHrI0Of_loMBCxxcAHiNGXBbjOOE369O8" -H "Cache-Control: no-cache" "http://localhost:3000/users/username"
```
### PATCH (RESTRICTED by JWT, updates user data in the database, returns json of the server response)
```
curl -X PATCH -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJqZWxsbyJ9.TPTs0irsJGFHrI0Of_loMBCxxcAHiNGXBbjOOE369O8" -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'username=john&password=password&someotherdata=someotherdata' "http://localhost:3000/users/john"
```
### DELETE (RESTRICTED by JWT, destroys user record in the database, returns json of the server response)
```
curl -X DELETE -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJqZWxsbyJ9.TPTs0irsJGFHrI0Of_loMBCxxcAHiNGXBbjOOE369O8" -H "Cache-Control: no-cache" "http://localhost:3000/users/buffalo"
```


## Start a new Amazon Instance running the server
1. log in to amazon aws console, select EC2, select the currently running "users server"
2. select "Actions" dropdown above the list of instances, select "Launch more like this" - make amendments as you see fit, it should work within the free-tier as is - click "Launch" at the bottom of the page
3. You should get a prompt to select a security key - make your own new key pair to work with the instance - it should download automatically, save it somewhere you will remember (I made a .keys directory in my root directory to store things like this)
4. Once the instance starts you will need to ssh to it to work on the new instance. eg.
```
ssh -i yourNewKeyYouJustMade.pem ubuntu@ec2-54-183-140-131.us-west-1.compute.amazonaws.com
```
5. Once inside the instance you will need to setup your environment - you will need:
```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install git
```
6. Now you need to clone the git repo for the dynamo server and npm install inside
```
git clone https://github.com/KChristP/dynamo.git
cd dynamo
npm install
```
7. Currently you have to set environment variables on the server every time you log in in order to access Amazon. You will probably want to use your own amazon security credenitals. If you already have written down somwehere your AWS Access key ID and AWS Secret Access Key, use those and skip the remaining parts of step 7, otherwise create a new set and save them somewhere safe:

7.a. Go to your Amazon Management console, select your username at the top right, select "My security credentials" from the dropdown.

7.b. Select Users on the lefthand side panel, select your own name, then select the tab in the middle of the page that says "Security Credentials", then select "Create access key". When it downloads, store somewhere safe.

7.c. back inside the instance ssh window
```
export AWS_ACCESS_KEY_ID="INSERTYOURACCESSKEYHERE"
export AWS_SECRET_ACCESS_KEY="INSERTYOURAWSSECRETACCESSKEYHERE" 
export AWS_REGION="us-west-1"
```
8. Everything should ready now. to run the server and see the output in terminal
```
node bin/www
```
or to start the server indefinitely...
```
forever start bin/www
```

