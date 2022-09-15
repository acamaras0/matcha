import db from "../config/Database.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    db.query(
      "SELECT * FROM users WHERE refresh_token = ?",
      [refreshToken],
      (err, result) => {
        if (err) console.log(err);
        else {
          if (!result[0]) return res.sendStatus(403);
          const userId = result[0].id;
          const name = result[0].name;
          const email = result[0].email;
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
              if (err) return res.sendStatus(403);
              const accessToken = jwt.sign(
                { userId, name, email },
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: "15s",
                }
              );
              res.json({ accessToken });
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
