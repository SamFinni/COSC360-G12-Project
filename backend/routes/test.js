const express = require('express');
const router = express.Router();
const Test = require('../models/test.model');

// these are some sample endpoints, showing how to query the database.
// in a real endpoint, there can be a bunch more logic besides just the database query.
// also, there will typically be some query data sent in with these calls, accessible via `req.body`.
// this data could be an email & password, blog post ID, body text & title for a new blog post, etc.

// select
router.post('/select', async function (req, res) {
  try {
    const test = await Test.findAll();

    // can modify/parse/do whatever with 'test' here before sending it back

    res.status(200).send(test);
  } catch (error) {
    res.status(500).send(error);
  }
});

// insert (single & multi)
router.post('/insert', async function (req, res) {
  try {
    // single insert
    await Test.create({ title: 'Big Red Truck', price: 10000.00 });

    // multi insert
    const data = [
      { title: 'I\'m free!!' }, // price has default value of 0.00 (see models/test.model.js)
      { title: 'Best I can do', price: 3.50 },
    ];
    await Test.bulkCreate(data);
    
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// update
router.post('/update', async function (req, res) {
  try {
    await Test.update({ price: 6000.00 }, {
      where: {
        title: 'Big Red Truck'
      }
    });
    
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete
router.post('/delete', async function (req, res) {
  try {
    await Test.destroy({
      where: {
        title: 'Big Red Truck'
      }
    });
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// drop table
router.post('/drop', async function (req, res) {
  try {
    await Test.drop();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// create table (sync)
router.post('/create', async function (req, res) {
  try {
    await Test.sync();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;