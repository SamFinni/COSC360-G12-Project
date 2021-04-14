const express = require('express');
const sequelize = require('../db/sequelize');
const Post = require('../models/post.model');
const router = express.Router();
const PostScore = require('../models/postscore.model');
const { QueryTypes } = require("sequelize");

// get score
router.post('/select', async function (req, res) {
    const { uid, pid } = req.body;

    if (!uid || !pid) return res.status(500).send({ id: 1, message: "`uid` or `pid` missing from body" });

    try {
        const uidUser = await User.findAll({
            attributes: ['id'],
            where: { id: uid },
        });
        if (uidUser.length == 0) return res.status(500).send({ id: 3, message: "`uid` user does not exist" });
        const pidPost = await Post.findAll({
            attributes: ['id'],
            where: { id: pid },
        });
        if (pidPost.length == 0) return res.status(500).send({ id: 3, message: "`pid` post does not exist" });

        //TODO
    } catch (error) {
        res.status(500).send(error);
    }
});

// update score
router.post('/update', async function (req, res) {
    const { uid, pid } = req.body;

    if (!uid || !pid) return res.status(500).send({ id: 1, message: "`uid` or `pid` missing from body" });

    try {
        const uidUser = await User.findAll({
            attributes: ['id'],
            where: { id: uid },
        });
        if (uidUser.length == 0) return res.status(500).send({ id: 3, message: "`uid` user does not exist" });
        const pidPost = await Post.findAll({
            attributes: ['id'],
            where: { id: pid },
        });
        if (pidPost.length == 0) return res.status(500).send({ id: 3, message: "`pid` post does not exist" });

        //TODO
    } catch (error) {
        res.status(500).send(error);
    }
});

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
              type: QueryTypes.UPDATE,
            }
        );
        return res.status(200).send(updateScore);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;