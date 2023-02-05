import db from "../config/db_init.js";
import bcrypt from "bcrypt";

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

export const getUserByRefreshToken = (token, callback) => {
  db.query(
    "SELECT * FROM users WHERE refresh_token = ?",
    [token],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result[0]);
    }
  );
};

export const getUserByResetToken = (token, callback) => {
  db.query(
    "SELECT * FROM users WHERE reset_token = ?",
    [token],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result[0]);
    }
  );
};

export const queryDb = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const getBlockedUsers = async (userId) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM block WHERE user_id=?", [userId], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export const getUserByToken = async (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE refresh_token = ?",
      [token],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};

export const getRecommendedUsersQuery = (
  loggedIn,
  blocked,
  orientation,
  gender
) => {
  let query;
  if (blocked.length > 0) {
    if (orientation === "heterosexual" && gender === "female") {
      query = `SELECT * FROM users WHERE id NOT IN (${loggedIn}, ${blocked}) AND gender = 'male' AND (orientation = 'heterosexual' OR orientation = 'bisexual')`;
    } else if (orientation === "heterosexual" && gender === "male") {
      query = `SELECT * FROM users WHERE id NOT IN (${loggedIn}, ${blocked}) AND gender = 'female' AND (orientation = 'heterosexual' OR orientation = 'bisexual')`;
    } else if (orientation === "homosexual" && gender === "female") {
      query = `SELECT * FROM users WHERE id NOT IN (${loggedIn}, ${blocked}) AND gender = 'female' AND (orientation = 'homosexual' OR orientation = 'bisexual')`;
    } else if (orientation === "homosexual" && gender === "male") {
      query = `SELECT * FROM users WHERE id NOT IN (${loggedIn}, ${blocked}) AND gender = 'male' AND (orientation = 'homosexual' OR orientation = 'bisexual')`;
    } else if (orientation === "bisexual") {
      query = `SELECT * FROM users WHERE id NOT IN (${loggedIn}, ${blocked})`;
    }
  } else {
    if (orientation === "heterosexual" && gender === "female") {
      query = `SELECT * FROM users WHERE id != ${loggedIn} AND gender = 'male' AND (orientation = 'heterosexual' OR orientation = 'bisexual')`;
    } else if (orientation === "heterosexual" && gender === "male") {
      query = `SELECT * FROM users WHERE id != ${loggedIn} AND gender = 'female' AND (orientation = 'heterosexual' OR orientation = 'bisexual')`;
    } else if (orientation === "homosexual" && gender === "female") {
      query = `SELECT * FROM users WHERE id != ${loggedIn} AND gender = 'female' AND (orientation = 'homosexual' OR orientation = 'bisexual')`;
    } else if (orientation === "homosexual" && gender === "male") {
      query = `SELECT * FROM users WHERE id != ${loggedIn} AND gender = 'male' AND (orientation = 'homosexual' OR orientation = 'bisexual')`;
    } else if (orientation === "bisexual") {
      query = `SELECT * FROM users WHERE id != ${loggedIn}`;
    }
  }
  return query;
};
