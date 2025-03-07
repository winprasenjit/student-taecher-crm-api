const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { specs, swaggerUi } = require('./swaggerConfig');

// Set up Global configuration access
dotenv.config();

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false)
    .connect('mongodb://127.0.0.1/teacher-student')
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

require('./models/User');
require('./models/Subject');
require('./models/Academic');
require('./models/Batch');
require('./models/Class');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const subjectRouter = require('./routes/subjects');
const academicRouter = require('./routes/academics');
const teacherRouter = require('./routes/teachers');
const studentRouter = require('./routes/students');
const classRouter = require('./routes/classes');
const batchRouter = require('./routes/batches');

const app = express();
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        console.log(whitelist, origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subjects', subjectRouter);
app.use('/academics', academicRouter);
app.use('/teachers', teacherRouter);
app.use('/students', studentRouter);
app.use('/classes', classRouter);
app.use('/batches', batchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
