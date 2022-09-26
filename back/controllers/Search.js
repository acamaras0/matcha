import db from "../config/Database.js";

export const byAge = async (req, res) => {
  const min = req.params.minAge;
  const max = req.params.maxAge;
  const id = req.params.id;

  console.log(min, max, id);
  db.query("SELECT * FROM block WHERE user_id=?", [id], (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    if (result.length > 0) {
      const blocked = result.map((item) => item.blocked_id);
      console.log(blocked);
      db.query(
        `SELECT * FROM users WHERE birthdate BETWEEN ? AND ? AND id NOT IN (?, ?)`,
        [min, max, id, blocked],
        (err, result1) => {
          if (err) {
            console.log("here", result1);
            return console.log(err);
          }
          res.json(result1);
        }
      );
    } else {
      db.query(
        `SELECT * FROM users WHERE birthdate BETWEEN ? AND ? AND id != ?`,
        [min, max, id],
        (err, result1) => {
          if (err) {
            console.log("here", result1);
            return console.log(err);
          }
          res.json(result1);
        }
      );
    }
  });
};
