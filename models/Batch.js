var mongoose = require('mongoose');

var BatchSchema = new mongoose.Schema({
  name: String,
  description: String,
  className: {type: mongoose.Schema.Types.ObjectId, ref: "Academic"},
  students: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
});

mongoose.model('Batch', BatchSchema, 'batch');