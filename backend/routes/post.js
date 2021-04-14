const express = require('express');
const {QueryTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const router = express.Router();
const Post = require('../models/post.model');

// get list of posts
router.post('/list', async function (req, res) {
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
        const postData = await sequelize.query(
            `INSERT INTO posts (uid, title, body, tags)
            VALUES (`+uid+`, "`+title+`", "`+body+`", "`+tags+`")`,
            { type: QueryTypes.INSERT }
        );
        return res.status(200).send(postData);
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

// search for posts
router.post('/search', async function (req, res) {
    try {
      const postData = await sequelize.query(
        `SELECT * 
        FROM posts 
        WHERE title LIKE "%`+req.body.title +`%" OR body LIKE "%`+req.body.body +`%"`,
        {
          type: QueryTypes.SELECT
        }
      );
      if (postData.length == 0) {
        return res.status(200).send({ id: 0, message: "No posts found." });
      }
      else {
        return res.status(200).send(postData);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

// get list of top posts ordered by rating and date
router.post('/listTop', async function (req, res) {
    try {
        const postData = await sequelize.query(
          `SELECT P.id AS pid, P.title, P.body, P.tags, P.createdAt, U.id AS uid, U.username, U.image, PS.score 
          FROM posts P JOIN postscores PS ON P.id = PS.pid JOIN users U ON PS.uid = U.id 
          ORDER BY PS.score DESC, P.createdAt DESC 
          LIMIT 10`,
          {
            type: QueryTypes.SELECT
          }
        );
        if (postData.length == 0) {
          return res.status(200).send({ id: 0, message: "No posts found." });
        }
        else {
          return res.status(200).send(postData);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;