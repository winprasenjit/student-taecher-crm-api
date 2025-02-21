var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
    name: String,
    description: String
});

mongoose.model('Class', ClassSchema, 'class');