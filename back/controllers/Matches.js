import Matches from "../models/MatchModel.js";
import Users from "../models/UserModel.js";

export const insertLike = async (req, res) => {
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
  if (check1) {
    try {
      await Matches.update(
        {
          match_status: 1,
        },
        {
          where: {
            user1: user2,
            user2: user1,
          },
        }
      );
      res.status(200).send({ msg: "You got a match!" });
    } catch (err) {
      console.log(err);
    }
  } else if (check)
    return res.status(200).send({ msg: "You can like only once." });
  else {
    try {
      await Matches.create({
        user1: user1,
        user2: user2,
        match_status: 0,
      });
      await Users.update(
        {
          fame: fame.fame + 1,
        },
        {
          where: {
            id: user2,
          },
        }
      );
      res.status(200).send({ msg: "Liked!" });
    } catch (err) {
      console.log(err);
    }
  }
};

export const unLike = async (req, res) => {
  const user1 = req.params.user1;
  const user2 = req.params.user2;
  const check = await Matches.findOne({
    where: { user1, user2 },
  });
  const check1 = await Matches.findOne({
    where: { user1: user2, user2: user1 },
  });
  if (check) {
    await Matches.destroy({
      where: {
        user1,
        user2,
      },
    });
    res.status(200).send({ msg: "Disliked!" });
  } else if (check1) {
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
    res.status(200).send({ msg: "Unmatched!" });
  }
};

export const getMatches = async (req, res) => {
  const user = req.params.user;
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
  const count = await Users.findOne({
    attributes: ["fame"],
    where: {
      id: user,
    },
  });
  res.json(count);
};
