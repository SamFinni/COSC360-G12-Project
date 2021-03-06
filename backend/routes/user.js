const express = require("express");
const router = express.Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const User = require("../models/user.model");
const ResetKey = require("../models/resetkey.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cfg = require("./../config");
const ip = cfg.FRONTEND_IP;
const port = cfg.FRONTEND_PORT;

// get list of all users
router.post("/list", async function (req, res) {
  try {
    const userList = await sequelize.query(
      `SELECT * 
      FROM users`,
      {
        logging: false,
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).send({ id: 0, list: userList });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// get list of 10 important users
router.post("/listDisabledAndAdmin", async function (req, res) {
  try {
    const userList = await sequelize.query(
      `SELECT * 
      FROM users 
      WHERE admin = 1 OR disabled = 1 
      ORDER BY admin DESC, disabled DESC 
      LIMIT 10`,
      {
        logging: false,
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).send({ id: 0, list: userList });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// get user data
router.post("/getUser", async function (req, res) {
  try {
    const userData = await sequelize.query(
      `SELECT username, bio, image 
      FROM users 
      WHERE id = ` + req.body.uid,
      {
        logging: false,
        type: QueryTypes.SELECT,
      }
    );
    userData[0].image = userData[0].image.toString();
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async function (req, res) {
  try {
    const userData = await sequelize.query(
      `SELECT username, password, email, id
      FROM users 
      WHERE username = "` +
      req.body.username +
      `" AND disabled = false`,
      {
        logging: false,
        type: QueryTypes.SELECT,
      }
    );
    if (userData.length == 0) {
      return res.status(200).send({ id: 0, message: "Invalid username, or account disabled" });
    }
    bcrypt.compare(
      req.body.password,
      userData[0].password,
      function (err, result) {
        if (result == true) {
          return res.status(200).send(userData);
        } else {
          return res.status(200).send({ id: 1, message: "Invalid password" });
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

// forgot password (send email)
router.post("/forgotPassword", async function (req, res) {
  const { email } = req.body;

  if (!email)
    return res
      .status(500)
      .send({ id: 1, message: "`email` missing from body" });

  try {
    // make sure email user exists, get uid
    const user = await User.findAll({
      attributes: ["id", "email"],
      where: { email },
    });
    if (user.length == 0)
      return res
        .status(500)
        .send({ id: 3, message: "`email` user does not exist" });

    // delete any existing resetkey before continuing
    await ResetKey.destroy({
      where: { uid: user[0].id },
    });

    // generate 32-char key, create resetkey entry
    const key = crypto.randomBytes(16).toString("hex");
    await sequelize.query(
      `INSERT INTO resetkeys (uid, rkey)
      VALUES (?, ?)`,
      {
        replacements: [user[0].id, key],
        logging: false,
        type: QueryTypes.INSERT,
      }
    );

    // send email
    const transporter = await nodemailer.createTransport({
      host: "mail.gmx.com",
      port: 587,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      debug: true,
      auth: {
        user: "blogaru@gmx.com",
        pass: "Bloggy123",
      },
    });

    let mailOptions = {
      from: "blogaru@gmx.com",
      to: email,
      subject: "Blogaru - Password reset",
      html:
        `<a href="http://` +
        ip +
        `:` +
        port +
        `/resetPassword?key=` +
        key +
        `&uid=` +
        user[0].id +
        `">Click here</a> to reset your Blogaru password.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({ id: 0 });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// reset password
router.post("/resetPassword", async function (req, res) {
  const { key, uid, password } = req.body;

  if (!key || !uid || !password)
    return res
      .status(500)
      .send({
        id: 1,
        message: "`key`, `uid`, or `password` missing from body",
      });

  try {
    // make sure key is correct
    const resetkey = await ResetKey.findAll({
      where: { uid, rkey: key },
    });

    if (resetkey.length == 0)
      return res.status(500).send({ id: 2, message: "Invalid `uid` or `key`" });

    // delete resetkey
    await ResetKey.destroy({
      where: { uid },
    });

    // hash & update password
    await bcrypt.hash(password, 10, async function (err, hash) {
      await User.update(
        { password: hash },
        {
          where: {
            id: uid,
          },
        }
      );
    });

    res.status(200).send({ id: 0 });
  } catch (error) {
    return res.status(500).send({ id: 0, message: error.message });
  }
});

// insert user
router.post("/insertUser", async function (req, res) {
  try {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      const userData = await sequelize.query(
        `INSERT INTO users (email, username, bio, image, password)
        VALUES ("` +
        req.body.email +
        `", "` +
        req.body.username +
        `", "` +
        req.body.bio +
        `", "` +
        req.body.pic +
        `","` +
        hash +
        `");`,
        {
          logging: false,
          type: QueryTypes.INSERT,
        }
      ).catch((error) => {
        res.status(500).send(error);
      })
      res.status(200).send(userData);
    });
    // can modify/parse/do whatever with 'user' here before sending it back
  } catch (error) {
    res.status(500).send(error);
  }
});

// search for user by username/email
router.post("/checkExists", async function (req, res) {
  try {
    const userData = await sequelize.query(
      `SELECT * 
      FROM users 
      WHERE username ="` +
      req.body.username +
      `" OR email = "` +
      req.body.email +
      `";`,
      {
        logging: false,
        type: QueryTypes.SELECT,
      }
    );
    return res.status(200).send(userData.length > 0);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update
router.post("/updateUser", async function (req, res) {
  try {
    // can modify/parse/do whatever with 'user' here before sending it back
    const userData = await sequelize.query(
      `UPDATE users
      SET username = "` +
      req.body.username +
      `",  bio= "` +
      req.body.bio +
      `", image= "` +
      req.body.pic +
      `"
      WHERE id = ` +
      req.body.uid,
      {
        logging: false,
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update admin
router.post("/updateAdmin", async function (req, res) {
  try {
    const userData = await sequelize.query(
      `UPDATE users
      SET admin = ` +
      req.body.admin +
      `
      WHERE id = ` +
      req.body.uid,
      {
        logging: false,
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update disabled
router.post("/updateDisabled", async function (req, res) {
  try {
    const userData = await sequelize.query(
      `UPDATE users
      SET disabled = ` +
      req.body.disabled +
      `
      WHERE id = ` +
      req.body.uid,
      {
        logging: false,
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// search for user username/email
router.post("/search", async function (req, res) {
  try {
    const userData = await sequelize.query(
      `SELECT * 
      FROM users 
      WHERE username ="` +
      req.body.username +
      `" OR email = "` +
      req.body.email +
      `";`,
      {
        logging: false,
        type: QueryTypes.SELECT,
      }
    );
    return res.status(200).send(userData.length > 0);
  } catch (error) {
    res.status(500).send(error);
  }
});

// search for user with *like* username/email
// Used for user lookup
router.post("/searchLike", async function (req, res) {
  try {
    const userData = await sequelize.query(
      `SELECT * 
      FROM users 
      WHERE username LIKE "%` +
      req.body.username +
      `%" OR email LIKE "%` +
      req.body.email +
      `%" 
      ORDER BY admin DESC, disabled DESC`,
      {
        logging: false,
        type: QueryTypes.SELECT,
      }
    );
    if (userData.length == 0) {
      return res.status(200).send({ id: 0, message: "No users found" });
    } else {
      userData.forEach((x) => {
        x.image = x.image.toString();
      });
      return res.status(200).send(userData);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// get user data
// used to return the admin and disabled status of a user by id
router.post("/status", async function (req, res) {
  try {
    const userData = await sequelize.query(
      `SELECT admin, disabled 
      FROM users 
      WHERE id = ` + req.body.uid,
      {
        logging: false,
        type: QueryTypes.SELECT,
      }
    );
    return res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
