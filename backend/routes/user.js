const express = require('express');
const router = express.Router();
const {QueryTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

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
// get list of 10 important users 
router.post('/listDisabledAndAdmin', async function (req, res) {
  try {
    const userList = await sequelize.query(
      `SELECT * 
      FROM users 
      WHERE admin = 1 OR disabled = 1 
      ORDER BY admin DESC, disabled DESC 
      LIMIT 10`,
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
router.post('/login', async function (req, res) {
  console.log(req.body); // will display { blogID: 2632 } in console, as sent by frontend/pages/user in the selectAPI() function
//for signup:
  //   bcrypt.hash(req.body.password, 10, function(err, hash) {
//     console.log(hash);
// });

  try {
    // can modify/parse/do whatever with 'user' here before sending it back
    const userData = await sequelize.query(
      `SELECT username, password, email, id
      FROM users 
      WHERE username = "`+req.body.username +`"`,
      {
        type: QueryTypes.SELECT
      }
    );
    if(userData.length == 0){
      return res.status(200).send({ id: 0, message: "Invalid username" });
    }
    bcrypt.compare(req.body.password, userData[0].password, function(err, result) {
      if(result == true){
        return res.status(200).send(userData);
      }else{
        return res.status(200).send({ id: 1, message: "Invalid password" });
      }
  });
  
  } catch (error) {
    console.log(error);
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
router.post('/insertUser', async function (req, res) {
  console.log(req.body); // will display { blogID: 2632 } in console, as sent by frontend/pages/user in the selectAPI() function

  try {
    // can modify/parse/do whatever with 'user' here before sending it back
    const userData = await sequelize.query(
      `INSERT INTO users 
      WHERE id = `+req.body.uid,
      {
        type: QueryTypes.INSERT
      }
    );
    console.log(userData);
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});
  
// update
router.post('/updateUser', async function (req, res) {
  console.log(req.body); // will display { blogID: 2632 } in console, as sent by frontend/pages/user in the selectAPI() function

  try {
    // can modify/parse/do whatever with 'user' here before sending it back
    const userData = await sequelize.query(
      `UPDATE users
      SET username = "`+req.body.username+`",  bio= "`+req.body.bio +`", image= "`+ req.body.pic+`"
      WHERE id = `+req.body.uid,
      {
        type: QueryTypes.UPDATE
      }
    );
    console.log(userData);
    res.status(200).send(userData);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});



// Update admin
router.post('/updateAdmin', async function (req, res) {
  console.log(req.body); // will display { blogID: 2632 } in console, as sent by frontend/pages/user in the selectAPI() function

  try {
    const userData = await sequelize.query(
      `UPDATE users
      SET admin = `+req.body.admin+`
      WHERE id = `+req.body.uid,
      {
        type: QueryTypes.UPDATE
      }
    );
    console.log(userData);
    res.status(200).send(userData);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
// Update disabled
router.post('/updateDisabled', async function (req, res) {
  console.log(req.body); // will display { blogID: 2632 } in console, as sent by frontend/pages/user in the selectAPI() function

  try {
    const userData = await sequelize.query(
      `UPDATE users
      SET disabled = `+req.body.disabled+`
      WHERE id = `+req.body.uid,
      {
        type: QueryTypes.UPDATE
      }
    );
    console.log(userData);
    res.status(200).send(userData);
  } catch (error) {
    console.log(error);
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

// search for user by username/email
router.post('/search', async function (req, res) {
  console.log(req.body); // will display { blogID: 2632 } in console, as sent by frontend/pages/user in the selectAPI() function

  try {
    const userData = await sequelize.query(
      `SELECT * 
      FROM users 
      WHERE username LIKE "%`+req.body.username +`%" OR email LIKE "%`+req.body.email +`%" 
      ORDER BY admin DESC, disabled DESC`,
      {
        type: QueryTypes.SELECT
      }
    );
    if(userData.length == 0){
      return res.status(200).send({ id: 0, message: "No users found" });
    }
    else{
      return res.status(200).send(userData);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;