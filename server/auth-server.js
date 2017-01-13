// dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');

var LocalStrategy = require('passport-local').Strategy;

var app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// path.join(__dirname, '../public')
app.use(favicon(path.join(__dirname,'../public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

// routes

var router = express.Router();

router.get('/register', function(req, res) {
    res.json({ });
});

router.post('/register', function(req, res) {
    UserAccount.register(new UserAccount({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.json({ account : account });
        }

        passport.authenticate('local')(req, res, function () {
           res.json({ user : req.user });
        });
    });
});

router.get('/login', function(req, res) {
    res.json({ user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
   res.json({ user : req.user });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.json({ user : req.user });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


app.use('/rs/api', router);

// passport config

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);
var UserAccount = mongoose.model('Account', Account);
passport.use(new LocalStrategy(UserAccount.authenticate()));
passport.serializeUser(UserAccount.serializeUser());
passport.deserializeUser(UserAccount.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost:27017/rs-react-auth');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json( {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});



// Mongooes



app.listen(4000, '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:4000');
});
