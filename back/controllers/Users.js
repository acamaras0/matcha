import bcrypt from "bcrypt";
import validator from "validator";
import db from "../config/db_init.js";
import { transporter } from "../utils/functions.js";

export const accountActivation = async (req, res) => {
  const hash = req.params.hash;
  db.query(
    "SELECT * FROM users WHERE activ_token = ?",
    [hash],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result) {
        db.query(
          "UPDATE users SET activ_status = 1, activ_token = 0 WHERE activ_token = ?",
          [hash],
          (err, result) => {
            if (err) {
              res.send({ err: err });
            }
            res.status(200).json({
              msg: "Now you can login",
            });
          }
        );
      } else {
        res.status(200).json({
          msg: "An error has occured. Please try again later.",
        });
      }
    }
  );
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    return res.status(200).json({ msg: "Passwords do not match" });
  } else if (validator.isStrongPassword(password) === false) {
    return res.status(200).json({
      msg: "Password has to be at least 8 characters \n and contain at least one uppercase, \n one lowercase, one number and \n one special character",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hash, id],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        res.status(200).json({
          msg: "Password updated",
        });
      }
    );
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    firstName,
    lastName,
    email,
    bio,
    interests,
    gender,
    orientation,
    geoLat,
    geoLng,
    city,
    country,
    birthdate,
  } = req.body;
  let counter = 0;
  const tags = interests.join(", ");
  if (
    firstName &&
    validator.isAlpha(firstName) &&
    firstName.length < 20 &&
    firstName.length > 2
  ) {
    db.query("UPDATE users SET firstname = ? WHERE id = ?", [firstName, id]);
    counter++;
  }
  if (
    lastName &&
    validator.isAlpha(lastName) &&
    lastName.length < 20 &&
    lastName.length > 2
  ) {
    db.query("UPDATE users SET lastname = ? WHERE id = ?", [lastName, id]);
    counter++;
  }
  if (
    username &&
    validator.isAlpha(username) &&
    username.length < 10 &&
    username.length > 2
  ) {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, result) => {
        if (err) console.log(err);
        if (result.length > 0) {
          return console.log("email already exists ! ");
        } else
          db.query("UPDATE users SET username = ? WHERE id = ?", [
            username,
            id,
          ]);
      }
    );
    counter++;
  }
  if (email && validator.isEmail(email) && email.length < 30) {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) console.log(err);
      if (result.length > 0) {
        return console.log("email already exists ! ");
      } else db.query("UPDATE users SET email = ? WHERE id = ?", [email, id]);
    });
    counter++;
  }
  if (
    bio &&
    bio.length <= 499 &&
    !bio.match(
      /\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/gi
    )
  ) {
    db.query("UPDATE users SET bio = ? WHERE id = ?", [bio, id]);
    counter++;
  }
  if (interests.length > 0) {
    db.query("UPDATE users SET interests = ? WHERE id = ?", [tags, id]);
    counter++;
  }
  if (gender) {
    db.query("UPDATE users SET gender = ? WHERE id = ?", [gender, id]);
    counter++;
  }
  if (orientation) {
    db.query("UPDATE users SET orientation = ? WHERE id = ?", [
      orientation,
      id,
    ]);
    counter++;
  }
  if (geoLat && geoLat >= -90 && geoLat <= 90) {
    db.query("UPDATE users SET geo_lat = ? WHERE id = ?", [geoLat, id]);
    counter++;
  }
  if (geoLng && geoLng >= -180 && geoLng <= 180) {
    db.query("UPDATE users SET geo_long = ? WHERE id = ?", [geoLng, id]);
    counter++;
  }
  if (
    city &&
    city.length > 0 &&
    city.length < 20 &&
    !city.match(
      /\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/gi
    )
  ) {
    db.query("UPDATE users SET city = ? WHERE id = ?", [city, id]);
    counter++;
  }
  if (
    country &&
    country.length > 0 &&
    country.length < 20 &&
    !country.match(
      /\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/gi
    )
  ) {
    db.query("UPDATE users SET country = ? WHERE id = ?", [country, id]);
    counter++;
  }
  if (birthdate) {
    db.query("UPDATE users SET birthdate = ? WHERE id = ?", [birthdate, id]);
    counter++;
  }
  if (counter > 0) {
    res.status(200).json({ msg: "Profile updated." });
  } else {
    res.status(200).json({ msg: "Something went wrong." });
  }
};

export const resetPass = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const { confPassword } = req.body;
  if (password !== confPassword) {
    return res.status(200).send({ msg: "Passwords do not match" });
  } else if (!validator.isStrongPassword(password)) {
    return res.status(200).send({
      msg: "Password has to be at least 8 characters \n and contain at least one uppercase, \n one lowercase, one number and \n one special character",
    });
  } else {
    db.query(
      "SELECT * FROM users WHERE reset_token = ?",
      [token],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0 && result[0].reset_token === token) {
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds, function (err, hash) {
            db.query(
              "UPDATE users SET reset_token = 0, password = ? WHERE reset_token = ?",
              [hash, token],
              (err, result) => {
                if (err) {
                  res.send({ err: err });
                }
                res.send({ msg: "Success!" });
              }
            );
          });
        } else {
          return res.status(200).send({ msg: "Invalid token" });
        }
      }
    );
  }
};

export const forgotPass = async (req, res) => {
  const { email } = req.body;
  const token = process.env.ACCESS_TOKEN_SECRET;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return console.log(err);
    if (result.length > 0) {
      db.query(
        "UPDATE users SET reset_token = ? WHERE email = ?",
        [token, email],
        (err, result) => {
          if (err) return console.log(err);
          if (result) {
            const mailOptions = {
              from: "matcha.hive1@gmail.com",
              to: email,
              subject: "Reset your password",
              html: `<p>Click <a href="http://localhost:3000/resetPassword/${token}">here</a> to reset your password</p>`,
            };
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
            res.status(200).json({
              msg: "Email sent",
            });
          }
        }
      );
    } else {
      return res.status(200).json({
        msg: "Email not found",
      });
    }
  });
};

export const getRandomUser = async (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result) {
      res.json(result[0]);
    }
  });
};

export const getUsers = async (req, res) => {
  const token = req.params.token;
  db.query(
    "SELECT * FROM users WHERE refresh_token = ?",
    [token],
    (err, result) => {
      if (err) {
        return res.json({ err: err });
      }
      let loggedIn, orientation, gender;
      if (result.length > 0) {
        loggedIn = result[0].id;
        orientation = result[0].orientation;
        gender = result[0].gender;
      }
      db.query(
        "SELECT * FROM block WHERE user_id=?",
        [loggedIn],
        (err, result) => {
          if (err) {
            return res.json({ err: err });
          }
          if (result.length > 0) {
            const blocked = result.map((item) => item.blocked_id);
            if (orientation === "heterosexual" && gender === "female") {
              db.query(
                "SELECT * FROM users WHERE id NOT IN (?, ?) AND gender = 'male' AND (orientation = 'heterosexual' OR orientation = 'bisexual')",
                [loggedIn, blocked],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "heterosexual" && gender === "male") {
              db.query(
                "SELECT * FROM users WHERE id NOT IN (?, ?) AND gender = 'female' AND (orientation = 'heterosexual' OR orientation = 'bisexual')",
                [loggedIn, blocked],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "homosexual" && gender === "female") {
              db.query(
                "SELECT * FROM users WHERE id NOT IN (?, ?) AND gender = 'female' AND (orientation = 'homosexual' OR orientation = 'bisexual')",
                [loggedIn, blocked],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "homosexual" && gender === "male") {
              db.query(
                "SELECT * FROM users WHERE id NOT IN (?, ?) AND gender = 'male' AND (orientation = 'homosexual' OR orientation = 'bisexual')",
                [loggedIn, blocked],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "bisexual") {
              db.query(
                "SELECT * FROM users WHERE id NOT IN (?, ?)",
                [loggedIn, blocked],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            }
          } else {
            if (orientation === "heterosexual" && gender === "female") {
              db.query(
                "SELECT * FROM users WHERE id != ? AND gender = 'male' AND (orientation = 'heterosexual' OR orientation = 'bisexual')",
                [loggedIn],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "heterosexual" && gender === "male") {
              db.query(
                "SELECT * FROM users WHERE id != ? AND gender = 'female' AND (orientation = 'heterosexual' OR orientation = 'bisexual')",
                [loggedIn],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "homosexual" && gender === "female") {
              db.query(
                "SELECT * FROM users WHERE id != ? AND gender = 'female' AND (orientation = 'homosexual' OR orientation = 'bisexual')",
                [loggedIn],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "homosexual" && gender === "male") {
              db.query(
                "SELECT * FROM users WHERE id != ? AND gender = 'male' AND (orientation = 'homosexual' OR orientation = 'bisexual')",
                [loggedIn],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "bisexual") {
              db.query(
                "SELECT * FROM users WHERE id != ?",
                [loggedIn],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            }
          }
        }
      );
    }
  );
};

export const getLoggedIn = async (req, res) => {
  const token = req.params.token;
  db.query(
    "SELECT * FROM users WHERE refresh_token = ?",
    [token],
    (err, result) => {
      if (err) return res.json(err);
      res.json(result[0]);
    }
  );
};
