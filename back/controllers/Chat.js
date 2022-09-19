import db from "../config/Database.js";


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
  const text = req.body.text;
  db.query(
    "INSERT INTO messages (chat_id, sender, text) VALUES (?, ?, ?)",
    [chat_id, sender, text],
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