const express = require('express');
const sequelize = require('../db/sequelize');
const Post = require('../models/post.model');
const router = express.Router();
const PostScore = require('../models/postscore.model');
const { QueryTypes } = require("sequelize");

// update a post score
router.post('/updatePostScore', async function (req, res) {
    try {
        const updateScore = await sequelize.query(
            `UPDATE postscores
            SET score = ` +
            req.body.newScore +
            `
            WHERE pid = ` +
            req.body.pid,
            {
                logging: false,
                type: QueryTypes.UPDATE,
            }
        );
        return res.status(200).send(updateScore);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;