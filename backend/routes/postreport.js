const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const PostReport = require('../models/postreport.model');

// get list of all reports
router.post('/list', async function (req, res) {
  try {
    const reportList = await sequelize.query(
      `SELECT * 
      FROM postreports`,
      {
        logging: false,
        type: QueryTypes.SELECT
      }
    );
    res.status(200).send({ id: 0, list: reportList });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// search for report by *LIKE* reason/createdAt
router.post('/searchLike', async function (req, res) {
  try {
    const reportList = await sequelize.query(
      `SELECT * 
      FROM postreports 
      WHERE reason LIKE "%`+ req.body.reason + `%" OR createdAt LIKE "%` + req.body.createdAt + `%" 
      ORDER BY createdAt DESC`,
      {
        logging: false,
        type: QueryTypes.SELECT
      }
    );
    if (reportList.length == 0) {
      return res.status(200).send({ id: 0, message: "No reports found" });
    }
    else {
      return res.status(200).send(reportList);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;