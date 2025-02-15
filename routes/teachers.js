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

//GET specific teacher
router.get('/:id', function (req, res, next) {
  Teacher.findOne({_id: req.params.id}, function (err, subject) {
    if (err) {
      return next(err);
    }
    if (subject) {
      res.json(subject);
    } else {
      res.status(400).send('No Teacher found');
    }
  });
});

//GET teachers listing.
router.get('/', function (req, res, next) {
  Teacher.find().populate('qualification').exec(function (err, users) {
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

//Add teacher to mongodb
router.post('/', function (req, res, next) {
  const teacher = new Teacher(req.body);
  teacher.save(function (err, teacher) {
    if (err) {
      return next(err);
    }
    res.json(teacher);
  });
});

//update teacher
router.put('/', function (req, res, next) {
  Teacher.findOne({_id: req.body._id}, function (err, teacher) {
    if (err) {
      return res.status(500).send(err);
    }

    for (const x in req.body) {
      teacher[x] = req.body[x] || teacher[x];
    }

    teacher.save(function (err, teacher) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(teacher);
    });
  });
});

//Delete a teacher
router.delete('/:id', function (req, res, next) {
  Teacher.remove({_id: req.params.id}, function (err, subject) {
    if (err) throw err;
    res.json({
      success: true,
      message: 'Teacher successfully deleted!',
    });
  });
});

module.exports = router;
