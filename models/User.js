const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    mobile: String,
    email: String,
    type: String,
    class: String,
    qualification: { type: mongoose.Schema.Types.ObjectId, ref: "Academic" },
    aboutu: String,
    sex: String,
});

mongoose.model('User', UserSchema, 'user');
