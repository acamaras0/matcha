import db from "../config/db_init.js";

export const getNotificationsFromDb = async (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM notifications WHERE reciever_id = ? AND mark = 0",
      [userId],
      (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      }
    );
  });
};

export const updateNotificationsInDb = (userId, callback) => {
  db.query(
    "UPDATE notifications SET mark = 1 WHERE reciever_id = ?",
    [userId],
    (err, result) => {
      return callback(err, result);
    }
  );
};
