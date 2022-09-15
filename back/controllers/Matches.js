import db from "../config/Database.js";

export const insertLike = async (req, res) => {
  const user1 = req.params.user1;
  const user2 = req.params.user2;//logged in user

  db.query("SELECT fame FROM users WHERE id = ?", [user1], (err, result) => {
    if (err) console.log(err);
    db.query(
      "SELECT * FROM matches WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)",
      [user1, user2, user2, user1],
      (err, result1) => {
        if (result1 && result1[0].match_status === 0) {
          db.query(
            "UPDATE matches SET match_status = 1 WHERE (user1 = ? AND user2 =? )OR (user1 = ? AND user2 = ?)",
            [user1, user2, user2, user1]
          );
          return res.json({ msg: "You got a match!" });
          // db.query("UPDATE users SET fame = ?", [result.data.fame + 1])
          // db.query("INSERT INTO chat() VALUES () ")
        }
        else if (!result1){
          db.query("INSERT INTO matches (user1, user2, match_status) VALUES (?, ?, ?)", 
          [user1, user2, 0])
          return res.status(200).send({ msg: "Liked" })
        }
        else{
          return res.status(200).send({ msg: "You can like only once." });
        }
      }
    );
  });
};

export const unLike = async (req, res) => {
  const user1 = req.params.user1;
  const user2 = req.params.user2;
  const fame = await Users.findOne({
    attributes: ["fame"],
    where: {
      id: user2,
    },
  });
  const check = await Matches.findOne({
    where: { user1, user2 },
  });
  const check1 = await Matches.findOne({
    where: { user1: user2, user2: user1 },
  });
  if (check) {
    await Users.update(
      {
        fame: fame.fame - 1,
      },
      {
        where: {
          id: user2,
        },
      }
    );
    await Matches.destroy({
      where: {
        user1,
        user2,
      },
    });
    res.status(200).send({ msg: "Disliked!" });
  } else if (check1 && check1.dataValues.match_status == 1) {
    await Matches.update(
      {
        match_status: 0,
      },
      {
        where: {
          user1: user2,
          user2: user1,
        },
      }
    );
    await Users.update(
      {
        fame: fame.fame - 1,
      },
      {
        where: {
          id: user2,
        },
      }
    );
    res.status(200).send({ msg: "Unmatched!" });
  } else res.status(200).send({ msg: "Nothing to do here!" });
};

export const getMatches = async (req, res) => {
  const user = req.params.user;
  db.query(
    "SELECT * FROM matches WHERE user1 = ? OR user2 = ? AND match_status = 1",
    [user, user],
    (err, result) => {
      if (err) console.log(err);
      if (result) res.json(result[0]);
    }
  );
  const matches = await Matches.findAll({
    where: {
      user1: user,
      match_status: 1,
    },
  });
  res.status(200).send(matches);
};

export const getFame = async (req, res) => {
  const user = req.params.user;
  db.query("SELECT fame FROM users WHERE id = ?", [user], (err, result) => {
    if (err) console.log(err);
    if (result) res.json(result[0]);
  });
};
