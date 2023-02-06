import db from "../config/db_init.js";

export const getBlockedUsersQuery = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM block WHERE user_id = ?", [id], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

export const queryReport = (id, reported, callback) => {
  db.query(
    "SELECT * FROM report WHERE user_id = ? AND reported_id = ?",
    [id, reported],
    (err, result) => {
      if (err) return console.log(err);
      callback(result);
    }
  );
};

export const insertReport = (id, reported) => {
  db.query("INSERT INTO report (user_id, reported_id) VALUES (?, ?)", [
    id,
    reported,
  ]);
};

export const handleBlockDB = (id, blocked, successCb, errorCb) => {
  db.query(
    "SELECT * FROM block WHERE user_id = ? AND blocked_id = ?",
    [id, blocked],
    (err, result) => {
      if (err) {
        errorCb(err);
        return;
      }
      if (result.length > 0) {
        successCb({ msg: "You can block only once." });
        return;
      }
      db.query(
        "INSERT INTO block (user_id, blocked_id) VALUES (?, ?)",
        [id, blocked],
        (err) => {
          if (err) {
            errorCb(err);
            return;
          }
          db.query(
            "DELETE FROM matches WHERE (liked= ? AND liker = ?) OR (liked = ? AND liker = ?)",
            [id, blocked, blocked, id],
            (err) => {
              if (err) {
                errorCb(err);
                return;
              }
              db.query(
                "DELETE FROM chat WHERE (user1= ? AND user2 = ?) OR (user1 = ? AND user2 = ?)",
                [id, blocked, blocked, id],
                (err) => {
                  if (err) {
                    errorCb(err);
                    return;
                  }
                  successCb({ msg: "User blocked!" });
                }
              );
            }
          );
        }
      );
    }
  );
};
