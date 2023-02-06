import db from "../config/db_init.js";

export async function getPicPathFromDb(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT img FROM user_images WHERE user_id = ?;",
      id,
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}

export const getPicsByIdFromDb = (id, callback) => {
  db.query(
    "SELECT img, id FROM user_images WHERE user_id = ?;",
    id,
    (err, result) => {
      return callback(err, result);
    }
  );
};

export async function getUserIdFromRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE refresh_token = ?",
      refreshToken,
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length > 0) {
          resolve(result[0].id);
        } else {
          reject("No user found with this refreshToken");
        }
      }
    );
  });
}

export async function getUserImageCount(userId) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT COUNT(*) AS count FROM user_images WHERE user_id = ?",
      userId,
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result[0].count);
      }
    );
  });
}

export async function insertUserImage(userId, filename, img) {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO user_images (user_id, profile, pic_name, img) VALUES (?, ?, ?, ?)",
      [userId, 0, filename, img],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}

export const updateProfilePic = (img, user_id, callback) => {
  db.query(
    "UPDATE users SET profile_pic = ? WHERE id = ?",
    [img, user_id],
    callback
  );
};

export async function getPictureCount(userId) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT COUNT(*) AS count FROM user_images WHERE user_id = ?",
      [userId],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result[0].count);
      }
    );
  });
}
export async function getPicture(pictureId) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM user_images WHERE id = ?",
      [pictureId],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result[0]);
      }
    );
  });
}
export async function deletePicture(pictureId) {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM user_images WHERE id = ?",
      [pictureId],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}
