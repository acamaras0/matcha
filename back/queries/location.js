import db from "../config/db_init.js";

export const getUserId = async (refreshToken) => {
  const sql = `SELECT id FROM users WHERE refresh_token = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [refreshToken], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (result.length > 0) {
        resolve(result[0].id);
      }
    });
  });
};

export const getGeoLocation = async (userId) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (result.length > 0) {
        const geo = [result[0].geo_lat, result[0].geo_long];
        resolve(geo);
      }
    });
  });
};
