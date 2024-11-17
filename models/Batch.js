var mongoose = require('mongoose');

var BatchSchema = new mongoose.Schema({
    name: String,
    description: String
});

mongoose.model('Batch', BatchSchema, 'batch');