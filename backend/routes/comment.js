const express = require('express');
const {QueryTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const router = express.Router();
const Comment = require('../models/comment.model');

// get comments
router.post('/list', async function (req, res) {
    const { id } = req.body;

    try {
        const commentData = await sequelize.query(
            `SELECT C.id AS cid, C.pid, C.body, C.createdAt, U.id AS uid, U.username
            FROM comments C JOIN users U ON C.uid = U.id
            WHERE C.pid = ` + id + ``,
            {
                type: QueryTypes.SELECT
            }
        );
        return res.status(200).send(commentData);
    } catch (error) {
        res.status(500).send(error);
    }
});

// add a comment
router.post('/add', async function (req, res){
    const { pid, uid, body } = req.body;
    if (!pid || !uid || !body) return res.status(500).send({ id: 1, message: "`uid`, `pid`, or `body` missing from body" });
    
    try {
        const commentData = await sequelize.query(
            `INSERT INTO comments (pid, uid, body)
            VALUES (`+pid+`, "`+uid+`", "`+body+`")`,
            { type: QueryTypes.INSERT }
        );

    return res.status(200).send(commentData);
    } catch (error) {
        res.status(500).send({ id: 0, message: error.message });
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