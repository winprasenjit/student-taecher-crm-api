/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Returns a list of teachers
 *     description: Optional extended description in Markdown
 *     responses:
 *       200:
 *         description: A list of teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const type = 'teacher';
const Teacher = mongoose.model('User');

/* router.get('/:id', function (req, res, next) {
  Subject.findOne({ _id: req.params.id }, function (err, subject) {
    if (err) {
      return next(err);
    }
    if (subject) {
      res.json(subject);
    } else {
      res.status(400).send('No User found');
    }
  });
}); */

//GET subjects listing.
router.get('/', function (req, res, next) {
  Teacher.find({ type }, async function (err, users) {
    if (err) {
      return next(err);
    }

    const teachers = users.map((user) => {
      user.name = user.firstname + ' ' + user.lastname;
      return user;
    });

    res.json(teachers);
  });
});

//Add subject to mongodb
/* router.post('/', function (req, res, next) {
  var subject = new Subject(req.body);
  subject.save(function (err, subject) {
    if (err) {
      return next(err);
    }
    res.json(subject);
  });
}); */

//Add subject to mongodb
/* router.put('/', function (req, res, next) {
  Subject.findOne({ _id: req.body._id }, function (err, subject) {
    if (err) {
      return res.status(500).send(err);
    }

    for (var x in req.body) {
      subject[x] = req.body[x] || subject[x];
    }

    subject.save(function (err, subject) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(subject);
    });
  });
}); */

//Delete subject from mongodb
/* router.delete('/:id', function (req, res, next) {
  Subject.remove({ _id: req.params.id }, function (err, subject) {
    if (err) throw err;
    res.json({
      success: true,
      message: 'Subject successfully deleted!',
    });
  });
}); */

module.exports = router;
