import db from "../config/db_init.js";

export const location = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  let sql = `SELECT id FROM users WHERE refresh_token = ?`;
  let geo = [];
  db.query(sql, [refreshToken], (err, result) => {
    if (err) console.log(err);
    if (result.length > 0) {
      sql = "SELECT * FROM users WHERE id = ?";
      db.query(sql, [result[0].id], (err, result) => {
        if (err) console.log(err);
        if (result.length > 0) {
          geo.push(result[0].geo_lat, result[0].geo_long);
          res.send(geo);
        }
      });
    }
  });
};
