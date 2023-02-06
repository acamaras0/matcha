import db from "../config/db_init.js";
import {
  checkIfLikeExists,
  insertLikeinDB,
  increaseFame,
  decreaseFame,
  insertChat,
  deleteChat,
  deleteMatch,
  addViewinDB,
  getFameFromDb,
  retrieveMatches,
} from "../queries/matches.js";

export const insertLike = async (req, res) => {
  const liker = req.params.user1;
  const liked = req.params.user2;

  checkIfLikeExists(liker, liked, (err, like) => {
    if (err) {
      return console.log(err);
    }
    if (like.length <= 0) {
      insertLikeinDB(liker, liked, (err) => {
        if (err) {
          return console.log(err);
        }
        checkIfLikeExists(liked, liker, (err, match) => {
          if (err) {
            return console.log(err);
          }
          if (match.length > 0) {
            increaseFame(liked, (err) => {
              if (err) {
                return console.log(err);
              }
              insertChat(liker, liked, (err) => {
                if (err) {
                  return console.log(err);
                }
                return res.json({ msg: "You got a match!" });
              });
            });
          } else {
            increaseFame(liked, (err) => {
              if (err) {
                return console.log(err);
              }
              return res.status(200).send({ msg: "Liked!" });
            });
          }
        });
      });
    }
    if (like.length > 0) {
      deleteChat(liker, liked, (err) => {
        if (err) {
          return console.log(err);
        }
        deleteMatch(liker, liked, (err) => {
          if (err) {
            return console.log(err);
          }
          decreaseFame(liked, (err) => {
            if (err) {
              return console.log(err);
            }
            return res.status(200).send({ msg: "Unliked!" });
          });
        });
      });
    }
  });
};

export const checkIfLiked = async (req, res) => {
  const liked = req.params.user_id;
  const liker = req.params.id;
  if (liker && liked) {
    checkIfLikeExists(liker, liked, (err, like) => {
      if (err) {
        return console.log(err);
      }
      if (like.length > 0) {
        return res.status(200).send({ msg: "like" });
      } else {
        return res.status(200).send({ msg: "not liked" });
      }
    });
  }
};

export const getMatches = async (req, res) => {
  const user = req.params.user;
  retrieveMatches(user, (err, result) => {
    if (err) console.log(err);
    if (result) res.json(result);
  });
};

export const getFame = async (req, res) => {
  const user = req.params.user;
  getFameFromDb(user, (err, fame) => {
    if (err) {
      return console.log(err);
    }
    if (fame) {
      return res.status(200).send(fame);
    }
  });
};

export const addView = async (req, res) => {
  const id = req.params.id;
  addViewinDB(id, (err) => {
    if (err) {
      return console.log(err);
    }
    return res.status(200).send({ msg: "View added!" });
  });
};
