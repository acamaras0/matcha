import db from "../config/db_init.js";

export const activateUser = (hash, callback) => {
  db.query(
    "SELECT * FROM users WHERE activ_token = ?",
    [hash],
    (err, result) => {
      if (err) {
        callback(err, null);
      }
      if (result) {
        db.query(
          "UPDATE users SET activ_status = 1, activ_token = 0 WHERE activ_token = ?",
          [hash],
          (err, result) => {
            if (err) {
              callback(err, null);
            }
            callback(null, result);
          }
        );
      } else {
        callback(new Error("User not found"), null);
      }
    }
  );
};

export const updatePasswordInDB = (hash, id, callback) => {
  db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [hash, id],
    (err, result) => {
      return callback(err, result);
    }
  );
};

export const resetPasswordInDb = (password, token, callback) => {
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return callback(err);
    }
    db.query(
      "UPDATE users SET reset_token = 0, password = ? WHERE reset_token = ?",
      [hash, token],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  });
};
