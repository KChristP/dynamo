#API Endpoints:

##/login
### GET (returns html form to input username and password)
```
curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" "http://localhost:3000/login"
```
### POST (returns a JSON Web Token(JWT) for authentication if credentials are in the database)
```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'userid=jello&password=itsalive' "http://localhost:3000/login"
```

##/users/new
###GET (returns html form to input username and password)
```
curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" "http://localhost:3000/users/new"
```
###POST (adds user and password hash into the database, returns json of the server response)
```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'userid=username&password=password&someotherdata={someData: "stored here"}' "http://localhost:3000/users/new"
```

##/users/:id
###GET (RESTRICTED by JWT, returns json of all user data in the database)
```
curl -X GET -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJqZWxsbyJ9.TPTs0irsJGFHrI0Of_loMBCxxcAHiNGXBbjOOE369O8" -H "Cache-Control: no-cache" "http://localhost:3000/users/username"
```
###PATCH (RESTRICTED by JWT, updates user data in the database, returns json of the server response)
```
curl -X PATCH -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJqZWxsbyJ9.TPTs0irsJGFHrI0Of_loMBCxxcAHiNGXBbjOOE369O8" -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'username=john&password=password&someotherdata=someotherdata' "http://localhost:3000/users/john"
```
###DELETE (RESTRICTED by JWT, destroys user record in the database, returns json of the server response)
```
curl -X DELETE -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJqZWxsbyJ9.TPTs0irsJGFHrI0Of_loMBCxxcAHiNGXBbjOOE369O8" -H "Cache-Control: no-cache" "http://localhost:3000/users/buffalo"
```
