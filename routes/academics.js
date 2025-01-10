/**
 * @swagger
 * /academics:
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

const Academic = mongoose.model('Academic');
const User = mongoose.model('User');

router.get('/:id', function (req, res, next) {
  Academic.findOne({_id: req.params.id}, function (err, academic) {
    if (err) {
      return next(err);
    }
    if (academic) {
      res.json(academic);
    } else {
      res.status(400).send('No User found');
    }
  });
});

//GET academics listing.
router.get('/', function (req, res, next) {
  Academic.find(function (err, academics) {
    if (err) {
      return next(err);
    }
    res.json(academics);
  });
});

//Add academic to mongodb
router.post('/', function (req, res, next) {
  const academic = new Academic(req.body);
  academic.save(function (err, academic) {
    if (err) {
      return next(err);
    }
    res.json(academic);
  });
});

//Add academic to mongodb
router.put('/', function (req, res, next) {
  Academic.findOne({_id: req.body._id}, function (err, academic) {
    if (err) {
      return res.status(500).send(err);
    }

    for (const x in req.body) {
      academic[x] = req.body[x] || academic[x];
    }

    academic.save(function (err, academic) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(academic);
    });
  });
});

//Delete academic from mongodb
router.delete('/:id', function (req, res, next) {
  Academic.remove({_id: req.params.id}, function (err, academic) {
    if (err) throw err;
    res.json({
      success: true,
      message: 'Academic successfully deleted!',
    });
  });
});

//GET academic user listing.
router.get('/batch/:batchId', async function (req, res, next) {
  try {
    const batchId = req.params.batchId;
    const usersInAcademics = await User.find({qualification: batchId}).populate("qualification", "name");
    res.json(usersInAcademics);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
