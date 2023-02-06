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

export const updateFirstName = (firstName, id) => {
  db.query(
    "UPDATE users SET firstname = ? WHERE id = ?",
    [firstName, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

export const updateLastName = (lastName, id) => {
  db.query(
    "UPDATE users SET lastname = ? WHERE id = ?",
    [lastName, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};
export const checkIfUsernameExists = (username, callback) => {
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      return callback(err, result);
    }
  );
};

export const updateUsername = (username, id) => {
  db.query(
    "UPDATE users SET username = ? WHERE id = ?",
    [username, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

export const checkIfEmailExists = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    return callback(err, result);
  });
};

export const updateEmail = (email, id) => {
  db.query(
    "UPDATE users SET email = ? WHERE id = ?",
    [email, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

export const updateBio = (bio, id) => {
  db.query(
    "UPDATE users SET bio = ? WHERE id = ?",
    [bio, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

export const updateInterests = (interests, id) => {
  db.query(
    "UPDATE users SET interests = ? WHERE id = ?",
    [interests, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

export const updateGender = (gender, id) => {
  db.query(
    "UPDATE users SET gender = ? WHERE id = ?",
    [gender, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

export const updateOrientation = (orientation, id) => {
  db.query(
    "UPDATE users SET orientation = ? WHERE id = ?",
    [orientation, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

export const updateGeoLat = (geoLat, id) => {
  db.query(
    "UPDATE users SET geo_lat = ? WHERE id = ?",
    [geoLat, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

export const updateGeoLong = (geoLong, id) => {
  db.query(
    "UPDATE users SET geo_long = ? WHERE id = ?",
    [geoLong, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

export const updateCity = (city, id) => {
  db.query(
    "UPDATE users SET city = ? WHERE id = ?",
    [city, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

export const updateCountry = (country, id) => {
  db.query(
    "UPDATE users SET country = ? WHERE id = ?",
    [country, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

export const updateBirthdate = (birthdate, id) => {
  db.query(
    "UPDATE users SET birthdate = ? WHERE id = ?",
    [birthdate, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};
