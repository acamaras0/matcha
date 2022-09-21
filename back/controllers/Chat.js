import db from "../config/Database.js";
import validator from "validator";

export const checkIfUnread = async (req, res) => {
  const { id } = req.params;
  const chat_id = req.body.chat_id;
  const sql = `SELECT * FROM messages WHERE chat_id = ? AND receiver_id = ? AND read = 0`;
  db.query(sql, [chat_id, id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ status: "unread" });
    } else {
      res.send({ status: "read" });
    }
  });
};

export const getConversation = async (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT * FROM chat WHERE user1 = ? OR user2 = ?",
    [userId, userId],
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      return res.status(200).json(result);
    }
  );
};

export const newMessages = async (req, res) => {
  const chat_id = req.body.chat_id;
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const text = req.body.text;

  db.query(
    "INSERT INTO messages (chat_id, sender, receiver, text) VALUES (?, ?, ?, ?)",
    [chat_id, sender, receiver, text],
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      return res.status(200).json(result);
    }
  );
};

export const getMessages = async (req, res) => {
  const chat_id = req.params.chat_id;
  db.query(
    "SELECT * FROM messages WHERE chat_id = ?",
    [chat_id],
    (err, result) => {
      if (err) return console.log(err);
      return res.status(200).json(result);
    }
  );
};

export const getMessagesNotif = async (req, res) => {
  const id = req.params.id;
  console.log("HERE");
  db.query(
    "SELECT * FROM messages WHERE receiver = ? AND read_status = ?",
    [id, 0],
    (err, result) => {
      if (err) return console.log(err);
      return res.status(200).json(result);
    }
  );
};
