import Report from "../models/ReportModel.js";
import Block from "../models/BlockModel.js";
import Users from "../models/UserModel.js";
import Matches from "../models/MatchModel.js";

export const report = async (req, res) => {
  const id = req.params.user_id;
  const reported = req.params.reported_id;
  const check = await Report.findOne({
    where: { user_id: id, reported_id: reported },
  });
  if (check) return res.status(200).send({ msg: "You can report only once." });
  else {
    try {
      await Report.create({
        user_id: id,
        reported_id: reported,
      });
      res.status(200).send({ msg: "Reported!" });
    } catch (err) {
      console.log(err);
    }
  }
};
export const block = async (req, res) => {
  const id = req.params.user_id;
  const blocked = req.params.blocked_id;
  const check = await Block.findOne({
    where: { user_id: id, blocked_id: blocked },
  });
  if (check) return res.status(200).send({ msg: "You can block only once." });
  else {
    await Block.create({
      user_id: id,
      blocked_id: blocked,
    });
    res.status(200).send({ msg: "Blocked!" });
    await Matches.update(
      {
        match_status: 0,
      },
      {
        where: {
          user2: blocked,
        },
      }
    );
  }
};

// export const getBlockedUsers = async (req, res) => {
//   const id = req.params.id;
//   const blocked = await Block.findAll({
//     where: { user_id: id },
//   });
//   blocked.forEach((element) => {
//     console.log("element", element.dataValues.blocked_id);
//     const blockedId = element.dataValues.blocked_id;
//     console.log("BLOCKED", blockedId);
//     //res.status(200).send(blockedId);
//   });
//   // const getName = await Users.findAll({
//   //   where: { id: id },
//   // });
//   // console.log(getName);
//   res.status(200).send(blocked);
// };

// export const unblock = async (req, res) => {
//   const id = req.params.user_id;
//   const blocked = req.params.blocked_id;
//   const check = await Block.findOne({
//     where: { user_id: id, blocked_id: blocked },
//   });
//   if (check) {
//     await Block.destroy({
//       where: {
//         user_id: id,
//         blocked_id: blocked,
//       },
//     });
//     res.status(200).send({ msg: "Unblocked!" });
//   }
// };
