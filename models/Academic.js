const mongoose = require('mongoose');

const AcademicSchema = new mongoose.Schema({
    name: String,
    description: String
});

mongoose.model('Academic', AcademicSchema, 'academic');