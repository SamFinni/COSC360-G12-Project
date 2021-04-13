const express = require('express');
const router = express.Router();
const {QueryTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const PostReport = require('../models/postreport.model');

// get list of all reports
router.post('/list', async function (req, res) {
  try {
    const reportList = await sequelize.query(
      `SELECT * 
      FROM postreports`,
      {
        type: QueryTypes.SELECT
      }
    );
    res.status(200).send({ id: 0, list: reportList });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// select
router.post('/select', async function (req, res) {
    console.log(req.body); // will display { blogID: 2632 } in console, as sent by frontend/pages/postreport in the selectAPI() function
  
    try {
      const test = await Report.findAll();
  
      // can modify/parse/do whatever with 'postreport' here before sending it back
  
      res.status(200).send(test);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // insert (single & multi)
  router.post('/insert', async function (req, res) {
    try {
      // single insert
      await PostReport.create({ title: 'Big Red Truck', price: 10000.00 });
  
      // multi insert
      const data = [
        { title: 'I\'m free!!' }, // price has default value of 0.00 (see models/postreport.model.js)
        { title: 'Best I can do', price: 3.50 },
      ];
      await PostReport.bulkCreate(data);
      
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // update
  router.post('/update', async function (req, res) {
    try {
      await PostReport.update({ price: 6000.00 }, {
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
      await PostReport.destroy({
        where: {
          id: req.body.id
        }
      });
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  });

  
// search for report by *LIKE* reason/createdAt
router.post('/searchLike', async function (req, res) {
  try {
    const reportList = await sequelize.query(
      `SELECT * 
      FROM postreports 
      WHERE reason LIKE "%`+req.body.reason +`%" OR createdAt LIKE "%`+req.body.createdAt +`%" 
      ORDER BY createdAt DESC`,
      {
        type: QueryTypes.SELECT
      }
    );
    if(reportList.length == 0){
      return res.status(200).send({ id: 0, message: "No reports found" });
    }
    else{
      return res.status(200).send(reportList);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;