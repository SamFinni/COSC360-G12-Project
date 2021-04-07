const express = require('express');
const sequelize = require('../db/sequelize');
const router = express.Router();
const Post = require('../models/post.model');

// get list of posts
router.post('/select', async function (req, res) {
    const { uid } = req.body;

    if (!uid) return res.status(500).send({ id: 1, message: "`uid` missing from body" });

    try {
        // make sure uid user exists
        const uidUser = await User.findAll({
            attributes: [ 'id' ],
            where: { id: uid },
        });
        if (uidUser.length == 0) return res.status(500).send({ id: 3, message: "`uid` user does not exist" });

        const postList = await sequelize.query(
            //TODO
        );

        res.status(200).send({id: 0, list: postList});
    } catch (error) {
        res.status(500).send({id: 0, message: error});
    }
});

// add a post
router.post('/add', async function (req, res){
    const { uid, title, body, tags } = req.body;

    if (!uid || !title || !body) return res.status(500).send({ id: 1, message: "`uid`, `title`, or `body` missing from body" });

    try {
        await Post.create({ uid, title, body, tags });
        return res.status(200).send({ id:0, message: "Post successfully created." });
    } catch (error) {
        res.status(500).send({ id: 0, message: error.message });
    }
});

// update a post
router.post('/update', async function (req, res) {
    const { uid } = req.body;

    if (!uid || !id) return res.status(500).send({ id: 1, message: "`uid` or `id` missing from body" });

    try {
        //TODO
    } catch (error) {
        res.status(500).send(error);
    }
});

// remove a post
router.post('/remove', async function (req, res) {
    const {id, uid} = req.body;

    if (!uid || !id) return res.status(500).send({ id: 1, message: "`uid` or `id` missing from body" });

    try {
        // TODO
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;