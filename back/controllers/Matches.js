import Matches from "../models/MatchModel.js";

export const insertLike = async (req, res) => {
  const user1 = req.params.user1;
  const user2 = req.params.user2;
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
  if (check) {
    await Matches.destroy({
      where: {
        user1,
        user2,
      },
    });
    res.status(200).send({ msg: "Disliked!" });
  }
};
