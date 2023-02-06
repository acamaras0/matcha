import db from "../config/db_init.js";

export const checkIfLikeExists = (liker, liked, callback) => {
  db.query(
    "SELECT * FROM matches WHERE liker = ? AND liked = ?",
    [liker, liked],
    (err, like) => {
      if (err) {
        return callback(err);
      }
      return callback(null, like);
    }
  );
};

export const insertLikeinDB = (liker, liked, callback) => {
  db.query("INSERT INTO matches (liker, liked) VALUES (?, ?)", [liker, liked]);
  return callback(null);
};

export const increaseFame = (userId, callback) => {
  db.query("UPDATE users SET fame = fame + 1 WHERE id = ?", [userId]);
  return callback(null);
};

export const decreaseFame = (userId, callback) => {
  db.query("UPDATE users SET fame = fame - 1 WHERE id = ?", [userId]);
  return callback(null);
};

export const insertChat = (user1, user2, callback) => {
  db.query("INSERT INTO chat(user1, user2) VALUES (?, ?)", [user1, user2]);
  return callback(null);
};

export const deleteChat = (user1, user2, callback) => {
  db.query(
    "DELETE FROM chat WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)",
    [user1, user2, user2, user1]
  );
  return callback(null);
};

export const deleteMatch = (liker, liked, callback) => {
  db.query("DELETE FROM matches WHERE liker = ? AND liked = ?", [liker, liked]);
  return callback(null);
};

export const addViewinDB = (id, callback) => {
  db.query("UPDATE users SET profile_views = profile_views + 1 WHERE id = ?", [
    id,
  ]);
  return callback(null);
};

export const getFameFromDb = (id, callback) => {
  db.query("SELECT fame FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return callback(err);
    return callback(null, result[0]);
  });
};

export const retrieveMatches = (user, callback) => {
  db.query(
    "SELECT * FROM matches WHERE liker = ? OR liked = ? AND match_status = 1",
    [user, user],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    }
  );
};
