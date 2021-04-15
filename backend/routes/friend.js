const express = require('express');
const { Op, QueryTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const router = express.Router();
const Friend = require('../models/friend.model');
const User = require('../models/user.model');

// add a friend (or accept friend request)
router.post('/add', async function (req, res) {
  const { uid, fuid } = req.body;

  if (!uid || !fuid) return res.status(500).send({ id: 1, message: "`uid` or `fuid` missing from body" });
  if (uid == fuid) return res.status(500).send({ id: 2, message: "You can't add yourself!" });

  try {
    // make sure uid and fuid users exist
    const uidUser = await User.findAll({
      attributes: [ 'id' ],
      where: { id: uid },
    });
    const fuidUser = await User.findAll({
      attributes: [ 'id' ],
      where: { id: fuid },
    });
    if (uidUser.length == 0) return res.status(500).send({ id: 3, message: "`uid` user does not exist" });
    if (fuidUser.length == 0) return res.status(500).send({ id: 4, message: "`fuid` user does not exist" });

    // check if they've already added us
    const theyAdded = await Friend.findAll({
      attributes: [ 'accepted' ],
      where: {
        uid: fuid,
        fuid: uid,
      },
    });
    // if they've already added us and we haven't accepted yet, set accepted = true, return
    if (theyAdded.length > 0)
      if (!theyAdded[0].dataValues.accepted) {
        await Friend.update({ accepted: true }, {
          where: {
            uid: fuid,
            fuid: uid,
          },
        });
        return res.status(200).send({ id: 0, message: "Friend request accepted" });
      // if we're already friends, return
      } else return res.status(200).send({ id: 2, message: "Friend request already accepted" });

    // now check if we've already added them
    const iAdded = await Friend.findAll({
      where: {
        uid,
        fuid,
      },
    });
    // if we've already added them, return, otherwise create a new `friend` entry and return
    if (iAdded.length > 0) return res.status(200).send({ id: 3, message: "Friend request already created" });
    else {
      // get our username
      const myUsername = await User.findAll({
        attributes: [ 'username' ],
        where: { id: uid },
      });

      // create the friend request
      await Friend.create({ uid, fuid });

      // send notification to the person we're adding
      req.uest({
        method: 'POST',
        url: '/notification/add',
        body: {
          uid: fuid,
          title: "Friend request",
          text: "You received a friend request from @" + myUsername[0].dataValues.username + ". Click here to go to their profile and add them back!",
          link: "/profile/" + uid
        },
      });

      return res.status(200).send({ id: 1, message: "Friend request created" });
    }
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// remove a friend (or deny friend request)
router.post('/remove', async function (req, res) {
  const { uid, fuid } = req.body;

  if (!uid || !fuid) return res.status(500).send({ id: 1, message: "`uid` or `fuid` missing from body" });
  if (uid == fuid) return res.status(500).send({ id: 2, message: "You can't remove yourself!" });

  try {
    // make sure uid and fuid users exist
    const uidUser = await User.findAll({
      attributes: [ 'id' ],
      where: { id: uid },
    });
    const fuidUser = await User.findAll({
      attributes: [ 'id' ],
      where: { id: fuid },
    });
    if (uidUser.length == 0) return res.status(500).send({ id: 3, message: "`uid` user does not exist" });
    if (fuidUser.length == 0) return res.status(500).send({ id: 4, message: "`fuid` user does not exist" });

    // check that a friendship (accepted or not) exists
    const friendship = await Friend.findAll({
      where: {
        [Op.or]: [
          {
            uid: fuid,
            fuid: uid,
          },
          {
            uid,
            fuid,
          },
        ]
      },
    });
    
    // if friendship doesn't exist, return, else delete friendship
    if (friendship.length === 0) return res.status(200).send({ id: 1, message: "Friendship does not exist" });
    else {
      await Friend.destroy({
        where: {
          uid: friendship[0].uid,
          fuid: friendship[0].fuid,
        }
      });

      return res.status(200).send({ id: 0, message: "Friendship removed" });
    }
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// get list of friends (usernames, ids, and images)
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

    const friendList = await sequelize.query(
      `SELECT DISTINCT U.id, U.username, U.image
      FROM friends F
      JOIN users U ON (F.uid = ` + uid + ` AND F.fuid = U.id OR F.fuid = ` + uid + ` AND F.uid = U.id)
      WHERE F.accepted = true`,
      {
        type: QueryTypes.SELECT
      }
    );

    friendList.forEach((x) => {
      x.image = x.image.toString();
    });

    res.status(200).send({ id: 0, list: friendList });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// get list of friend requests (usernames, ids, and images)
router.post('/requests', async function (req, res) {
  const { uid } = req.body;

  if (!uid) return res.status(500).send({ id: 1, message: "`uid` missing from body" });
  
  try {
    // make sure uid user exists
    const uidUser = await User.findAll({
      attributes: [ 'id' ],
      where: { id: uid },
    });
    if (uidUser.length == 0) return res.status(500).send({ id: 3, message: "`uid` user does not exist" });

    const friendList = await sequelize.query(
      `SELECT DISTINCT U.id, U.username, U.image
      FROM friends F
      JOIN users U ON (F.uid = U.id)
      WHERE F.fuid = ` + uid + ` AND F.accepted = false`,
      {
        type: QueryTypes.SELECT
      }
    );
    
    friendList.forEach((x) => {
      x.image = x.image.toString();
    });

    res.status(200).send({ id: 0, list: friendList });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// remove a friend
router.post('/remove', async function (req, res) {
  const { uid, fuid } = req.body;

  if (!uid || !fuid) return res.status(500).send({ id: 1, message: "`uid` or `fuid` missing from body" });
  if (uid == fuid) return res.status(500).send({ id: 2, message: "You can't remove yourself as a friend!" });

  try {
    // make sure uid and fuid users exist
    const uidUser = await User.findAll({
      attributes: [ 'id' ],
      where: { id: uid },
    });
    const fuidUser = await User.findAll({
      attributes: [ 'id' ],
      where: { id: fuid },
    });
    if (uidUser.length == 0) return res.status(500).send({ id: 3, message: "`uid` user does not exist" });
    if (fuidUser.length == 0) return res.status(500).send({ id: 4, message: "`fuid` user does not exist" });
  
    // check if users are friends
    const friends = await Friend.findAll({
      attributes: [ 'uid', 'fuid' ],
      where: {
        [Op.or]: [
          {
            uid: uid,
            fuid: fuid,
          },
          {
            uid: fuid,
            fuid: uid,
          },
        ],
        accepted: true,
      },
    });

    if (friends.length > 0) await Friend.destroy({
      where: {
        uid: friends[0].dataValues.uid,
        fuid: friends[0].dataValues.fuid,
      }
    });

    res.status(200).send({ id: 0, message: 'Friendship removed' });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

module.exports = router;