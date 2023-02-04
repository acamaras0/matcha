import db from "../config/db_init.js";

export const markMessagesSeen = async (userId) => {
  const sql = "UPDATE messages SET read_status = 1 WHERE receiver = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

export const getChatBetweenUsers = async (userId) => {
  const sql = "SELECT * FROM chat WHERE user1 = ? OR user2 = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [userId, userId], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

export const createNewMessage = async (chat_id, sender, receiver, text) => {
    const sql =
      "INSERT INTO messages (chat_id, sender, receiver, text) VALUES (?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.query(sql, [chat_id, sender, receiver, text], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    });
  };

 export async function executeQuery(query, params, res) {
    db.query(query, params, (err, result) => {
      if (err) return console.log(err);
      return res.status(200).json(result);
    });
  }
