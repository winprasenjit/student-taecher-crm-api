var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

var User = mongoose.model('User');
const jwt = require('jsonwebtoken');

let generateToken = ({ username, _id }) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        userId: _id,
        username: username,
        time: Date(),
    };

    const token = jwt.sign(data, jwtSecretKey);
    return token;
};

// Generating JWT
router.post('/generateToken', (req, res) => {
    // Validate User Here
    // Then generate JWT Token

    const token = generateToken(req.body);

    res.send(token);
});

// Verification of JWT
router.get('/validateToken', (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send('Successfully Verified');
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});

//Authenticate user to mongodb
router.post('/authenticate', function (req, res, next) {
    var userInfo;
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (user) {
            if (user.password !== req.body.password) {
                res.status(200).json({
                    error: true,
                    message: "Password doesn't match",
                });
            } else {
                userInfo = user.toObject();
                delete userInfo.password;
                const token = generateToken(userInfo);
                res.cookie(process.env.TOKEN_HEADER_KEY, token, {
                    maxAge: 900000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                });
                res.status(200).json(userInfo);
            }
        } else {
            res.status(200).send({
                error: true,
                message: "No user found",
            });
        }
    });
});

router.get('/:id', function (req, res, next) {
    User.findOne({ _id: req.params.id }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            res.json(user);
        } else {
            res.status(400).send('No User found');
        }
    });
});

//GET users listing.
router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            return next(err);
        }
        res.json(users);
    });
});

//Add user to mongodb
router.post('/', function (req, res, next) {
    var user = new User(req.body);
    user.save(function (err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

//Add user to mongodb
router.put('/', function (req, res, next) {
    User.findOne({ _id: req.body._id }, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }

        for (var x in req.body) {
            user[x] = req.body[x] || user[x];
        }

        user.save(function (err, user) {
            if (err) {
                res.status(500).send(err);
            }
            res.send(user);
        });
    });
});

//Delete user from mongodb
router.delete('/', function (req, res, next) {
    User.remove({ username: req.body.username }, function (err, user) {
        if (err) throw err;
        res.json({
            success: true,
            message: 'User successfully deleted!',
        });
    });
});

module.exports = router;
