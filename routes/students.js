/**
 * @swagger
 * /students:
 *   get:
 *     summary: Returns a list of students
 *     description: Optional extended description in Markdown
 *     responses:
 *       200:
 *         description: A list of students
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
const type = 'student';
const Student = mongoose.model('User');

//GET specific student
router.get('/:id', function (req, res, next) {
  Student.findOne({ _id: req.params.id }, function (err, subject) {
    if (err) {
      return next(err);
    }
    if (subject) {
      res.json(subject);
    } else {
      res.status(400).send('No Student found');
    }
  });
});

//GET students listing.
router.get('/', function (req, res, next) {
  Student.find({ type }, async function (err, users) {
    if (err) {
      return next(err);
    }

    const students = users.map((user) => {
      user.name = user.firstname + ' ' + user.lastname;
      return user;
    });

    res.json(students);
  });
});

//Add student to mongodb
router.post('/', function (req, res, next) {
  const student = new Student(req.body);
  student.save(function (err, student) {
    if (err) {
      return next(err);
    }
    res.json(student);
  });
}); 

//update student
 router.put('/', function (req, res, next) {
  Student.findOne({ _id: req.body._id }, function (err, student) {
    if (err) {
      return res.status(500).send(err);
    }

    for (var x in req.body) {
      student[x] = req.body[x] || student[x];
    }

    student.save(function (err, student) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(student);
    });
  });
});

//Delete a student
 router.delete('/:id', function (req, res, next) {
  Student.remove({ _id: req.params.id }, function (err, subject) {
    if (err) throw err;
    res.json({
      success: true,
      message: 'Student successfully deleted!',
    });
  });
});

module.exports = router;
