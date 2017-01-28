# Simple Rest API Server
## powered by express , passport , mongodb
## GIT repository

[https://github.com/ravi4j/auth-server.git]

```
$
$ mkdir auth-server
$ cd auth-server
$git clone git@github.com:ravi4j/auth-server.git
```

## Pre-requesite reading


#### Express , Passport , Mongodb
Familiarize youself to express.js , Passport.js and mongodb

#### Simple Authenication and Registration
Simple REST API for User login and registration process

### Install express
- npm install --save-dev express

### Install body-parser
- npm install --save-dev  body-parser

### Install APP Dependencies
- npm install --save mongoose
- npm install --save passport
- npm install --save passport-local
- npm install --save passport-local-mongoose
- npm install --save express-session
- npm install --save cookie-parser
- npm install --save serve-favicon
- npm install --save serve-morgan


## Application Structure

- Mongodb
    - Create a rs-react-auth database
    - Create a accounts collection {username , password }
    - Start MongoDb
        - mongod -f C:\MongoDB\Server\3.2\mongod.cfg
- server
    - auth-server.js ( Need to break into different Modules)

## Start Server
 - $node auth-server.js

