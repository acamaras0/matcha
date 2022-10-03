import db from "../config/Database.js";

export const getNotifications = async (req, res) => {
  const userId = req.params.id;
  db.query(
    "SELECT * FROM notifications WHERE reciever_id = ? AND mark = 0",
    [userId],
    (err, result) => {
      if (err) console.log(err);
      return res.json(result);
    }
  );
};

export const markNotifications = async (req, res) => {
  const userId = req.params.id;
  db.query(
    "UPDATE notifications SET mark = 1 WHERE reciever_id = ?",
    [userId],
    (err, result) => {
      if (err) console.log(err);
      return res.json(result);
    }
  );
};
