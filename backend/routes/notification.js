const express = require('express');
const router = express.Router();
const Notification = require('../models/notification.model');

// get notification list
router.post('/list', async function (req, res) {
  const { uid } = req.body;

  if (!uid) return res.status(500).send({ id: 1, message: "`uid` missing from body" });

  try {
    const notifications = await Notification.findAll({
      where: {
        uid,
        seen: false,
      },
      order: [
        ['createdAt', 'ASC'],
      ],
    });
    return res.status(200).send({ id: 0, list: notifications });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// add new notification (to be used by other endpoints)
router.post('/add', async function (req, res) {
  const { uid, title, text } = req.body;
  const link = req.body.link ? req.body.link : null;

  if (!uid || !title || !text) return res.status(500).send({ id: 1, message: "`uid`, `title`, or `text` missing from body" });

  try {
    await Notification.create({ uid, title, text, link });
    return res.status(200).send({ id: 0, message: "Notification created" });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// set a notification as 'seen'
router.post('/seen', async function (req, res) {
  const { id } = req.body;

  if (!id) return res.status(500).send({ id: 1, message: "`id` missing from body" });

  try {
    await Notification.update({ seen: true }, {
      where: { id },
    });
    return res.status(200).send({ id: 0, message: "Notification marked as seen" });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

module.exports = router;