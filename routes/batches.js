/**
 * @swagger
 * /batch:
 *   get:
 *     summary: Returns a list of users
 *     description: Optional extended description in Markdown
 *     responses:
 *       200:
 *         description: A list of users
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

const Batch = mongoose.model('Batch');

router.get('/:id', function (req, res, next) {
  Batch.findOne({ _id: req.params.id }, function (err, batch) {
    if (err) {
      return next(err);
    }
    if (batch) {
      res.json(batch);
    } else {
      res.status(400).send('No User found');
    }
  });
});

//GET batch listing.
router.get('/', function (req, res, next) {
  Batch.find(function (err, batch) {
    if (err) {
      return next(err);
    }
    res.json(batch);
  });
});

//Add batch to mongodb
router.post('/', function (req, res, next) {
  var batch = new Batch(req.body);
  batch.save(function (err, batch) {
    if (err) {
      return next(err);
    }
    res.json(batch);
  });
});

//Add batch to mongodb
router.put('/', function (req, res, next) {
  Batch.findOne({ _id: req.body._id }, function (err, batch) {
    if (err) {
      return res.status(500).send(err);
    }

    for (var x in req.body) {
      batch[x] = req.body[x] || batch[x];
    }

    batch.save(function (err, batch) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(batch);
    });
  });
});

//Delete batch from mongodb
router.delete('/:id', function (req, res, next) {
  Batch.remove({ _id: req.params.id }, function (err, batch) {
    if (err) throw err;
    res.json({
      success: true,
      message: 'Batch successfully deleted!',
    });
  });
});

module.exports = router;
