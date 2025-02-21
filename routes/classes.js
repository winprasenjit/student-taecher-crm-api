/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Returns a list of academics
 *     description: Optional extended description in Markdown
 *     responses:
 *       200:
 *         description: A list of academics
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

const Class = mongoose.model('Class');

router.get('/:id', function (req, res, next) {
  Class.findOne({ _id: req.params.id }, function (err, sClass) {
    if (err) {
      return next(err);
    }
    if (sClass) {
      res.json(sClass);
    } else {
      res.status(400).send('No Class found');
    }
  });
});

//GET classes listing.
router.get('/', function (req, res, next) {
    Class.find(function (err, sClasses) {
    if (err) {
      return next(err);
    }
    res.json(sClasses);
  });
});

//Add class to mongodb
router.post('/', function (req, res, next) {
    // console.log("sukanta", req.body);
  var sClass = new Class(req.body);
  sClass.save(function (err, sClass) {
    if (err) {
      return next(err);
    }
    console.log(sClass);
    res.json(sClass);
  });
});

//Edit class to mongodb
router.put('/', function (req, res, next) {
  Class.findOne({ _id: req.body._id }, function (err, sClass) {
    if (err) {
      return res.status(500).send(err);
    }

    for (var x in req.body) {
      sClass[x] = req.body[x] || sClass[x];
    }

    sClass.save(function (err, sClass) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(sClass);
    });
  });
});

//Delete class from mongodb
router.delete('/:id', function (req, res, next) {
  Class.remove({ _id: req.params.id }, function (err, sClass) {
    if (err) throw err;
    res.json({
      success: true,
      message: 'Class successfully deleted!',
    });
  });
});

module.exports = router;
