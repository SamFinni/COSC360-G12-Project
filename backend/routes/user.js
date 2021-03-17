const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// select
router.post('/select', async function (req, res) {
    console.log(req.body); // will display { blogID: 2632 } in console, as sent by frontend/pages/user in the selectAPI() function
  
    try {
      const test = await User.findAll();
  
      // can modify/parse/do whatever with 'user' here before sending it back
  
      res.status(200).send(test);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // insert (single & multi)
  router.post('/insert', async function (req, res) {
    try {
      // single insert
      await User.create({ title: 'Big Red Truck', price: 10000.00 });
  
      // multi insert
      const data = [
        { title: 'I\'m free!!' }, // price has default value of 0.00 (see models/user.model.js)
        { title: 'Best I can do', price: 3.50 },
      ];
      await User.bulkCreate(data);
      
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // update
  router.post('/update', async function (req, res) {
    try {
      await User.update({ price: 6000.00 }, {
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
      await User.destroy({
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
      await User.drop();
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // create table (sync)
  router.post('/create', async function (req, res) {
    try {
      await User.sync();
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;