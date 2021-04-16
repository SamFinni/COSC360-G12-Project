const express = require('express');
const sequelize = require('../db/sequelize');
const router = express.Router();
const CommentScore = require('../models/commentscore.model');

// get comment score
router.post('/select', async function (req, res) {
    const { cid } = req.body;

    if (!cid) return res.status(500).send({ id: 1, message: "`cid` missing from body" });

    try {
        // make sure uid user exists
        const cidUser = await User.findAll({
            attributes: ['id'],
            where: { id: cid },
        });
        if (cidUser.length == 0) return res.status(500).send({ id: 3, message: "`cid` user does not exist" });

        const commentScoreList = await sequelize.query(
            //TODO
        );

        res.status(200).send({ id: 0, list: commentScoreList });
    } catch (error) {
        res.status(500).send({ id: 0, message: error });
    }
});

// add a score
router.post('/add', async function (req, res) {
    const { cid } = req.body;

    if (!cid) return res.status(500).send({ id: 1, message: "`cid` missing from body" });

    try {
        // make sure uid user exists
        const cidUser = await User.findAll({
            attributes: ['id'],
            where: { id: cid },
        });
        if (cidUser.length == 0) return res.status(500).send({ id: 3, message: "`uid` user does not exist" });

    } catch (error) {
        res.status(500).send(error);
    }
});

// update a score
router.post('/update', async function (req, res) {
    const { cid } = req.body;

    if (!cid || !id) return res.status(500).send({ id: 1, message: "`cid` or `id` missing from body" });

    try {
        //TODO
    } catch (error) {
        res.status(500).send(error);
    }
});

// remove a comment
router.post('/remove', async function (req, res) {
    const { id, cid } = req.body;

    if (!cid || !id) return res.status(500).send({ id: 1, message: "`cid` or `id` missing from body" });

    try {
        // TODO
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;