var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    mobile: String,
    email: String,
    type: String,
    class: String,
    aboutu: String,
    sex: String,
});

mongoose.model('User', UserSchema, 'user');
