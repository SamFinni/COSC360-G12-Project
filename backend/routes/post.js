const express = require('express');
const { QueryTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const router = express.Router();
const Post = require('../models/post.model');

// get post
router.post('/getPost', async function (req, res) {
  const { id } = req.body;

  try {
    const data = await sequelize.query(
      `SELECT P.id AS pid, P.title, P.body, P.createdAt, U.id AS uid, U.username, PS.score 
            FROM posts P JOIN users U ON P.uid = U.id JOIN postscores PS ON P.id = PS.pid 
            WHERE P.id = ` + id + ``,
      {
        logging: false,
        type: QueryTypes.SELECT
      }
    );
    return res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// add a post
router.post('/add', async function (req, res) {
  const { uid, title, body, tags } = req.body;
  if (!uid || !title || !body) return res.status(500).send({ id: 1, message: "`uid`, `title`, or `body` missing from body" });

  try {
    // add post
    const postData = await sequelize.query(
      `INSERT INTO posts (uid, title, body, tags)
            VALUES (`+ uid + `, "` + title + `", "` + body + `", "` + tags + `")`,
      {
        logging: false,
        type: QueryTypes.INSERT
      }
    );

    // add postscores based on the post inserted above ^
    const pid = postData[0]; // id of the post just inserted. This will match the id of it's postscores entry.  Yes- this is dumb as shit but we got 2 days to go. Just pretend we haven't taken any database courses :^)
    await sequelize.query(
      `INSERT INTO postscores (pid, uid, score)
            VALUES (`+ pid + `, "` + uid + `", "1")`,
      {
        logging: false,
        type: QueryTypes.INSERT
      }
    );

    return res.status(200).send(postData);
  } catch (error) {
    res.status(500).send({ id: 0, message: error.message });
  }
});

// remove a post
router.post('/remove', async function (req, res) {
  const id = req.body.id;

  if (!id) return res.status(500).send({ id: 1, message: "`id` missing from body" });
  try {
    // delete postscores
    const postscoresData = await sequelize.query(
      `DELETE FROM postscores 
            WHERE pid = `+ id,
      {
        logging: false,
        type: QueryTypes.DELETE
      }
    );
    // delete post
    const postsData = await sequelize.query(
      `DELETE FROM posts 
            WHERE id = `+ id,
      {
        logging: false,
        type: QueryTypes.DELETE
      }
    );
    return res.status(200).send(postsData + "\n" + postscoresData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// search for posts
router.post('/search', async function (req, res) {
  try {
    const postData = await sequelize.query(
      `SELECT P.id AS pid, P.title, P.body, P.createdAt, U.id AS uid, U.username, U.image, PS.score 
            FROM posts P JOIN users U ON P.uid = U.id JOIN postscores PS ON P.id = PS.pid 
            WHERE P.title LIKE "%`+ req.body.query + `%" OR P.body LIKE "%` + req.body.query + `%" OR U.username LIKE "%` + req.body.query + `%"`,
      {
        logging: false,
        type: QueryTypes.SELECT
      }
    );
    return res.status(200).send(postData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get list of top posts ordered by rating and date
router.post('/listByDate', async function (req, res) {
  try {
    const postData = await sequelize.query(
      `SELECT P.id AS pid, P.title, P.body, P.tags, P.createdAt, U.id AS uid, U.username, U.image, PS.score 
          FROM posts P JOIN postscores PS ON P.id = PS.pid JOIN users U ON PS.uid = U.id 
          ORDER BY P.createdAt DESC, PS.score DESC 
          LIMIT 20`,
      {
        logging: false,
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
          LIMIT 20`,
      {
        logging: false,
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
// get list of worst posts ordered by rating and date
router.post('/listWorst', async function (req, res) {
  try {
    const postData = await sequelize.query(
      `SELECT P.id AS pid, P.title, P.body, P.tags, P.createdAt, U.id AS uid, U.username, U.image, PS.score 
          FROM posts P JOIN postscores PS ON P.id = PS.pid JOIN users U ON PS.uid = U.id 
          ORDER BY PS.score ASC, P.createdAt DESC 
          LIMIT 20`,
      {
        logging: false,
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
// get list of all posts ordered by date
router.post('/listAll', async function (req, res) {
  try {
    const postData = await sequelize.query(
      `SELECT P.id AS pid, P.title, P.body, P.tags, P.createdAt, U.id AS uid, U.username, U.image, PS.score 
          FROM posts P JOIN postscores PS ON P.id = PS.pid JOIN users U ON PS.uid = U.id 
          ORDER BY PS.score DESC, P.createdAt DESC`,
      {
        logging: false,
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