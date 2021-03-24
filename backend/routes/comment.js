const express = require('express');
const sequelize = require('../db/sequelize');
const router = express.Router();
const Comment = require('../models/comment.model');

// get list of comments
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

        const commentList = await sequelize.query(
            //TODO
        );

        res.status(200).send({id: 0, list: commentList});
    } catch (error) {
        res.status(500).send({id: 0, message: error});
    }
});

// add a comment
router.post('/add', async function (req, res){
    const { uid } = req.body;

    if (!uid) return res.status(500).send({ id: 1, message: "`uid` missing from body" });

    try {
        // make sure uid user exists
        const uidUser = await User.findAll({
            attributes: ['id'],
            where: { id: uid },
        });
        if (uidUser.length == 0) return res.status(500).send({ id: 3, message: "`uid` user does not exist" });

    } catch (error) {
        res.status(500).send(error);
    }
});

// update a comment
router.post('/update', async function (req, res) {
    const { uid } = req.body;

    if (!uid || !id) return res.status(500).send({ id: 1, message: "`uid` or `id` missing from body" });

    try {
        //TODO
    } catch (error) {
        res.status(500).send(error);
    }
});

// remove a comment
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