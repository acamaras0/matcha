import {
  getBlockedUsersQuery,
  insertReport,
  queryReport,
  handleBlockDB,
} from "../queries/report.js";
import { sendEmail } from "../utils/functions.js";

export const report = async (req, res) => {
  const id = req.params.user_id;
  const reported = req.params.reported_id;

  queryReport(id, reported, (result) => {
    if (result.length > 0)
      return res.status(200).send({ msg: "You can report only once." });
    insertReport(id, reported);
    sendEmail("report", reported, id);
    return res.status(200).send({ msg: "User reported!" });
  });
};

export const block = async (req, res) => {
  const id = req.params.user_id;
  const blocked = req.params.blocked_id;

  handleBlockDB(
    id,
    blocked,
    (result) => {
      return res.status(200).json(result);
    },
    (err) => {
      console.log(err);
      return res.status(500).json({ msg: "Server error" });
    }
  );
};

export const getBlockedUsers = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await getBlockedUsersQuery(id);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error getting blocked users" });
  }
};
