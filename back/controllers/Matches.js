import db from "../config/Database.js";

export const insertLike = async (req, res) => {
  const liker = req.params.user1;
  const liked = req.params.user2;

  db.query(
    "SELECT * FROM matches WHERE liker = ? AND liked = ?",
    [liker, liked],
    (err, like) => {
      if (err) {
        return console.log(err);
      }
      if (like.length <= 0) {
        db.query("INSERT INTO matches (liker, liked) VALUES (?, ?)", [
          liker,
          liked,
        ]);
        db.query(
          "SELECT * FROM matches WHERE liker = ? AND liked = ?",
          [liked, liker],
          (err, match) => {
            if (err) {
              return console.log(err);
            }
            if (match.length > 0) {
              db.query("UPDATE users SET fame = fame + 1 WHERE id = ?", [
                liked,
              ]);
              db.query("INSERT INTO chat(user1, user2) VALUES (?, ?)", [
                liker,
                liked,
              ]);
              return res.json({ msg: "You got a match!" });
            } else return res.status(200).send({ msg: "Liked!" });
          }
        );
      }
      if (like.length > 0) {
        db.query(
          "DELETE FROM chat WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)",
          [liker, liked, liked, liker]
        );
        db.query("DELETE FROM matches WHERE liker = ? AND liked = ?", [
          liker,
          liked,
        ]);
        db.query("UPDATE users SET fame = fame - 1 WHERE id = ?", [liked]);
        return res.status(200).send({ msg: "Unliked" });
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
  const liked = req.params.user_id;
  const liker = req.params.id;
  if (liker && liked) {
    db.query(
      "SELECT * FROM matches WHERE liker = ? AND liked = ?",
      [liker, liked],
      (err, result) => {
        if (err) console.log(err);
        if (result.length > 0) {
          return res.status(200).send({ msg: "like" });
        } else {
          return res.status(200).send({ msg: "not liked" });
        }
      }
    );
  }
};

export const getFame = async (req, res) => {
  const user = req.params.user;
  db.query("SELECT fame FROM users WHERE id = ?", [user], (err, result) => {
    if (err) console.log(err);
    if (result) res.json(result[0]);
  });
};
