import db from "../config/db_init.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "matcha.hive1@gmail.com",
    pass: PASSWORD_EMAIL,
  },
});

export const report = async (req, res) => {
  const id = req.params.user_id;
  const reported = req.params.reported_id;

  db.query(
    "SELECT * FROM report WHERE user_id = ? AND reported_id = ?",
    [id, reported],
    (err, result) => {
      if (err) return console.log(err);
      if (result.length > 0)
        return res.status(200).send({ msg: "You can report only once." });
      db.query("INSERT INTO report (user_id, reported_id) VALUES (?, ?)", [
        id,
        reported,
      ]);
      const mailOptions = {
        from: "matcha.hive1@gmail.com",
        to: "matcha.hive1@gmail.com",
        subject: "Report",
        text: "User " + id + " reported user " + reported,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
      });
      return res.status(200).send({ msg: "User reported!" });
    }
  );
};

export const block = async (req, res) => {
  const id = req.params.user_id;
  const blocked = req.params.blocked_id;
  db.query(
    "SELECT * FROM block WHERE user_id = ? AND blocked_id = ?",
    [id, blocked],
    (err, result) => {
      if (err) return console.log(err);
      if (result.length > 0)
        return res.status(200).send({ msg: "You can block only once." });
      db.query("INSERT INTO block (user_id, blocked_id) VALUES (?, ?)", [
        id,
        blocked,
      ]);
      db.query(
        "DELETE FROM matches WHERE (liked= ? AND liker = ?) OR (liked = ? AND liker = ?)",
        [id, blocked, blocked, id]
      );
      db.query(
        "DELETE FROM chat WHERE (user1= ? AND user2 = ?) OR (user1 = ? AND user2 = ?)",
        [id, blocked, blocked, id]
      );
      return res.status(200).json({ msg: "User blocked!" });
    }
  );
};

export const getBlockedUsers = async (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM block WHERE user_id = ?"[id], (err, result) => {
    if (err) return console.log(err);
    result.forEach((element) => {
      console.log("element", element.dataValues.blocked_id);
      const blockedId = element.dataValues.blocked_id;
      console.log("BLOCKED", blockedId);
      res.status(200).send(result);
    });
  });
};
