var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    description: String
});

mongoose.model('Subject', UserSchema, 'subject');