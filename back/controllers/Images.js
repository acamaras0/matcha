import db from "../config/Database.js";
import fs from "fs";

export const getPicPath = async (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT img FROM user_images WHERE user_id = ?;",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
};

export const getPicsById = async (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT img, id FROM user_images WHERE user_id = ?;",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "No images found" });
      }
    }
  );
};

export const uploadPic = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!req.file) {
    return res.status(200).json("No file uploaded");
  }
  db.query(
    "SELECT * FROM users WHERE refresh_token = ?",
    refreshToken,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        const user_id = result[0].id;
        const img = "http://localhost:5000/upload/" + req.file.filename;
        db.query(
          "SELECT COUNT(*) AS count FROM user_images WHERE user_id = ?",
          user_id,
          (err, result) => {
            if (err) {
              res.send({ err: err });
            }
            if (result[0].count < 4) {
              db.query(
                "INSERT INTO user_images (user_id, profile, pic_name, img) VALUES (? ,?, ?, ?)",
                [user_id, 0, req.file.filename, img],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                  res.status(200).json("Image uploaded");
                }
              );
            } else {
              return res.status(200).json("You can only have 5 pictures.");
            }
          }
        );
      }
    }
  );
};

export const ProfilePic = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!req.file) {
    return res.status(200).json("No file uploaded");
  }
  db.query(
    "SELECT * FROM users WHERE refresh_token = ?",
    refreshToken,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        const user_id = result[0].id;
        const img = "http://localhost:5000/upload/" + req.file.filename;
        db.query(
          "UPDATE users SET profile_pic = ? WHERE id = ?",
          [img, user_id],
          (err, result) => {
            if (err) {
              return console.log(err);
            }
            return res.status(200).json({ msg: "Picture uploaded!" });
          }
        );
      } else {
        return res.status(200).json({ msg: "something went wrong" });
      }
    }
  );
};

export const deletePic = async (req, res) => {
  const pic_id = req.params.id;
  const token = req.cookies.refreshToken;

  db.query(
    "SELECT * FROM users WHERE refresh_token = ?",
    [token],
    (err, result) => {
      if (err) {
        res.status(200).json({ err: err });
      }
      if (result) {
        const user_id = result[0].id;
        db.query(
          "SELECT COUNT(*) AS count FROM user_images WHERE user_id = ?",
          [user_id],
          (err, result) => {
            if (err) {
              res.status(200).json({ err: err });
            }
            if (result[0].count > 0) {
              db.query(
                "SELECT * FROM user_images WHERE id = ?",
                [pic_id],
                (err, result) => {
                  if (err) {
                    res.status(200).json({ err: err });
                  }
                  if (result.length > 0) {
                    let path = String(`./uploads/${result[0].pic_name}`);
                    fs.unlink(path, (err) => {
                      if (err) throw err;
                      res.status(200).json({ msg: "Picture deleted" });
                    });
                    db.query(
                      "DELETE FROM user_images WHERE id = ?",
                      [pic_id],
                      (err, result) => {
                        if (err) {
                          res.status(200).json({ err: err });
                        }
                      }
                    );
                  }
                }
              );
            } else if (result[0].count == 1) {
              return res
                .status(200)
                .json({ msg: "Last picture cannot be deleted" });
            }
          }
        );
      }
    }
  );
};
