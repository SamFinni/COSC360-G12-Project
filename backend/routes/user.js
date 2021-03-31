const express = require('express');
const router = express.Router();
const {QueryTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const User = require('../models/user.model');


// get list of all users
router.post('/list', async function (req, res) {
  try {
    const userList = await sequelize.query(
      `SELECT * 
      FROM users`,
      {
        type: QueryTypes.SELECT
      }
    );
    res.status(200).send({ id: 0, list: userList });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});
// get user data
router.post('/getUser', async function (req, res) {
  console.log(req.body); // will display { blogID: 2632 } in console, as sent by frontend/pages/user in the selectAPI() function

  try {
    // can modify/parse/do whatever with 'user' here before sending it back
    const userData = await sequelize.query(
      `SELECT username, bio, image 
      FROM users 
      WHERE id = `+req.body.uid,
      {
        type: QueryTypes.SELECT
      }
    );
    console.log(userData);
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});
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