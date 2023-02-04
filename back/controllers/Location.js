import { getUserId, getGeoLocation } from "../queries/location.js";

export const location = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const userId = await getUserId(refreshToken);
  const geo = await getGeoLocation(userId);
  res.send(geo);
};
