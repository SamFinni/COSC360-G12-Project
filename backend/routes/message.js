const express = require('express');
const { QueryTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const router = express.Router();
const Message = require('../models/message.model');

// send a message
router.post('/send', async function (req, res) {
  const { fromUid, toUid, text } = req.body;

  if (!fromUid || !toUid || !text) return res.status(500).send({ id: 1, message: "`fromUid`, `toUid`, or `text` missing from body" });
  if (fromUid == toUid) return res.status(500).send({ id: 2, message: "You can't send a message to yourself!" });

  try {
    // create a new Message
    await Message.create({ fromUid, toUid, text });
    return res.status(200).send({ id: 0, message: "Message sent" });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// get all messages for a user (object, each property keyed by username, valued as array of messages)
router.post('/list', async function (req, res) {
  const { uid } = req.body;

  if (!uid) return res.status(500).send({ id: 1, message: "`uid` missing from body" });

  try {
    let messages = await sequelize.query(
      `SELECT (CASE WHEN M.fromUid = ` + uid + ` THEN M.toUid ELSE M.fromUid END) AS uid,
      M.text, M.createdAt,
      (CASE WHEN M.fromUid = ` + uid + ` THEN 1 ELSE 0 END) AS sender
      FROM messages M
      WHERE M.fromUid = ` + uid + ` OR M.toUid = ` + uid + `
      ORDER BY createdAt ASC`,
      {
        type: QueryTypes.SELECT
      }
    );

    const messageUsers = await sequelize.query(
      `SELECT DISTINCT U.username, U.image, U.id
      FROM messages M
      JOIN users U ON (M.fromUid != ` + uid + ` AND M.fromUid = U.id OR M.toUid != ` + uid + ` AND M.toUid = U.id)`,
      {
        type: QueryTypes.SELECT
      }
    );

    messages = messages.reduce(
      function (memo, x) {
        if (!memo[x['uid']]) memo[x['uid']] = [];
        memo[x['uid']].push(x);
        delete x.uid;
        return memo;
      },
    {});

    let temp = [];

    for (u in messages) {
      const userData = messageUsers.filter(x => { return x.id == u })["0"];
      temp.push({
        username: userData.username,
        image: userData.image,
        uid: userData.id,
        messages: messages[u],
      });
    }

    messages = temp;

    return res.status(200).send(
      { id: 0, list: messages }
    );
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

module.exports = router;