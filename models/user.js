var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    country: String,
    locale:String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Accounts', User);
