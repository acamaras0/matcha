import db from "../config/Database.js";

export const insertLike = async (req, res) => {
  const liker = req.params.user1; //logged in user
  const liked = req.params.user2;

  db.query(
    "SELECT * FROM matches WHERE (liker = ? AND liked = ?) OR (liker = ? AND liked = ?)",
    [liker, liked, liked, liker],
    (err, result1) => {
      if (
        result1[0] &&
        result1[0].match_status == 0 &&
        result1[0].liked == liker
      ) {
        db.query(
          "UPDATE matches SET match_status = 1 WHERE liker = ? AND liked = ?",
          [liked, liker]
        );
        db.query("UPDATE users SET fame = fame + 1 WHERE id = ?", [liked]);
        db.query("INSERT INTO chat(user1, user2) VALUES (?, ?)", [
          liker,
          liked,
        ]);
        return res.json({ msg: "You got a match!" });
      } else if (result1.length < 1) {
        db.query(
          "INSERT INTO matches (liker, liked, match_status) VALUES (?, ?, ?)",
          [liker, liked, 0]
        );
        db.query("UPDATE users SET fame = fame + 1 WHERE id = ?", [liked]);
        return res.status(200).send({ msg: "Liked" });
      } else if (
        result1[0] &&
        result1[0].liker == liker &&
        result1[0].match_status == 0
      ) {
        db.query("DELETE FROM matches WHERE liker = ? AND liked = ?", [
          liker,
          liked,
        ]);
        db.query("UPDATE users SET fame = fame - 1 WHERE id = ?", [liked]);
        return res.status(200).send({ msg: "Unliked" });
      } else if (
        result1[0] &&
        (result1[0].liker == liked || result1[0].liked == liked) &&
        result1[0].match_status == 1
      ) {
        db.query(
          "DELETE FROM matches WHERE liker = ? AND liked = ? OR liker = ? AND liked = ?",
          [liked, liker, liker, liked]
        );
        db.query("UPDATE users SET fame = fame - 1 WHERE id = ?", [liked]);
        db.query(
          "DELETE FROM chat WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)",
          [liker, liked, liked, liker]
        );

        return res.status(200).send({ msg: "Unmatched" });
      }
    }
  );
};

export const getMatches = async (req, res) => {
  const user = req.params.user;
  db.query(
    "SELECT * FROM matches WHERE liker = ? OR liked = ? AND match_status = 1",
    [user, user],
    (err, result) => {
      if (err) console.log(err);
      if (result) res.json(result[0]);
    }
  );
};

export const checkIfLiked = async (req, res) => {
  const liker = req.params.user_id;
  const liked = req.params.id;
  db.query(
    "SELECT * FROM matches WHERE (liker = ? AND liked = ?) OR (liker = ? AND liked = ?)",
    [liker, liked, liked, liker],
    (err, result) => {
      if (err) console.log(err);
      if (result.length > 0) {
        if (result[0].match_status == 1) {
          return res.status(200).send({ msg: "match" });
        } else {
          return res.status(200).send({ msg: "like" });
        }
      } else {
        return res.status(200).send({ msg: "dislike" });
      }
    }
  );
};

export const getFame = async (req, res) => {
  const user = req.params.user;
  db.query("SELECT fame FROM users WHERE id = ?", [user], (err, result) => {
    if (err) console.log(err);
    if (result) res.json(result[0]);
  });
};
