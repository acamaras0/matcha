import {
  getNotificationsFromDb,
  updateNotificationsInDb,
} from "../queries/notifications.js";

export const getNotifications = async (req, res) => {
  const userId = req.params.id;
  try {
    const notifications = await getNotificationsFromDb(userId);
    return res.json(notifications);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to retrieve notifications" });
  }
};

export const markNotifications = async (req, res) => {
  const userId = req.params.id;
  updateNotificationsInDb(userId, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
