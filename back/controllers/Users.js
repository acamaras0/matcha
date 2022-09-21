import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import validator from "validator";
import db from "../config/Database.js";

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "add349a94e8fe5",
    pass: "161004143cb79c",
  },
});

// export const getCoordinates = async (req, res) => {
//   console.log("HHHEEEEEEEEREEEEEEEEE");

//   db.query("SELECT id, geo_lat, geo_long FROM users", (err, result) => {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(result);
//     return res.status(200).json(result);
//   });
// };

export const getNotifications = async (req, res) => {
  const userId = req.params.id;
  db.query(
    "SELECT * FROM notifications WHERE reciever_id = ? AND mark = 0",
    [userId],
    (err, result) => {
      if (err) console.log(err);
      return res.json(result);
    }
  );
};

export const markNotifications = async (req, res) => {
  const userId = req.params.id;
  db.query(
    "UPDATE notifications SET mark = 1 WHERE reciever_id = ?",
    [userId],
    (err, result) => {
      if (err) console.log(err);
      return res.json(result);
    }
  );
};

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
    return res.status(200).send("Passwords do not match");
  } else if (validator.isStrongPassword(password)) {
    return res.status(200).send("Password must be at least 8 characters");
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
  } = req.body;
  const tags = interests.join(", ");

  if (firstName) {
    db.query("UPDATE users SET firstname = ? WHERE id = ?", [firstName, id]);
  }
  if (lastName) {
    db.query("UPDATE users SET lastname = ? WHERE id = ?", [lastName, id]);
  }
  if (
    username &&
    validator.isAlphanumeric(username) &&
    username < 10 &&
    username > 2
  ) {
    db.query("UPDATE users SET username = ? WHERE id = ?", [username, id]);
  }
  if (email) {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) console.log(err);
      console.log(result);
      if (result) {
        return res.status(200).json({ msg: "Email already exists" });
      } else db.query("UPDATE users SET email = ? WHERE id = ?", [email, id]);
    });
  }
  if (bio && bio.length <= 500) {
    db.query("UPDATE users SET bio = ? WHERE id = ?", [bio, id]);
  }
  if (interests) {
    db.query("UPDATE users SET interests = ? WHERE id = ?", [tags, id]);
  }
  if (gender) {
    db.query("UPDATE users SET gender = ? WHERE id = ?", [gender, id]);
  }
  if (orientation) {
    db.query("UPDATE users SET orientation = ? WHERE id = ?", [
      orientation,
      id,
    ]);
  }
  if (geoLat && validator.isLatLong(geoLat)) {
    db.query("UPDATE users SET geo_lat = ? WHERE id = ?", [geoLat, id]);
  }
  if (geoLng && validator.isLatLong(geoLng)) {
    db.query("UPDATE users SET geo_long = ? WHERE id = ?", [geoLng, id]);
  }
};

export const resetPass = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const { confPassword } = req.body;
  if (password !== confPassword) {
    return res.status(200).send("Passwords do not match");
  } else if (!validator.isStrongPassword(password)) {
    return res.status(200).send("Password must be at least 8 characters");
  } else {
    db.query(
      "SELECT * FROM users WHERE reset_token = ?",
      [token],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result && result[0].reset_token === token) {
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds, function (err, hash) {
            db.query(
              "UPDATE users SET reset_token = 0, password = ? WHERE reset_token = ?",
              [hash, token],
              (err, result) => {
                if (err) {
                  res.send({ err: err });
                }
              }
            );
          });
        } else {
          return res.status(200).send("Invalid token");
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
    if (result) {
      db.query(
        "UPDATE users SET reset_token = ? WHERE email = ?",
        [token, email],
        (err, result) => {
          if (err) return console.log(err);
          if (result) {
            const mailOptions = {
              from: "Matcha",
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
          } else {
            res.status(200).json({
              msg: "Email not found",
            });
          }
        }
      );
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
            // console.log(blocked);
            if (orientation === "heterosexual" && gender === "female") {
              db.query(
                "SELECT * FROM users WHERE id NOT IN (?, ?) AND gender = 'male' AND (orientation = 'heterosexual' OR orientation = 'bisexual')",
                [loggedIn, ...blocked],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "heterosexual" && gender === "male") {
              db.query(
                "SELECT * FROM users WHERE id NOT IN (?, ?) AND gender = 'female' AND (orientation = 'heterosexual' OR orientation = 'bisexual')",
                [loggedIn, ...blocked],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                  // console.log(result);
                }
              );
            } else if (orientation === "homosexual" && gender === "female") {
              db.query(
                "SELECT * FROM users WHERE id NOT IN (?, ?) AND gender = 'female' AND orientation = 'homosexual'",
                [loggedIn, ...blocked],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "homosexual" && gender === "male") {
              db.query(
                "SELECT * FROM users WHERE id NOT IN (?, ?) AND gender = 'male' AND orientation = 'homosexual'",
                [loggedIn, ...blocked],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "bisexual") {
              db.query(
                "SELECT * FROM users WHERE id NOT IN (?, ?)",
                [loggedIn, ...blocked],
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
                "SELECT * FROM users WHERE id != ? AND gender = 'female' AND orientation = 'homosexual'",
                [loggedIn],
                (err, result) => {
                  if (err) return res.json({ err: err });
                  res.json(result);
                }
              );
            } else if (orientation === "homosexual" && gender === "male") {
              db.query(
                "SELECT * FROM users WHERE id != ? AND gender = 'male' AND orientation = 'homosexual'",
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

  // } else if (gender === "other") {
  //   try {
  //     const users = await Users.findAll({
  //       where: {
  //         id: { [Op.notIn]: [...block, id] },
  //       },
  //     });
  //     // const distance = users.map((item) => {
  //     //   return getDistanceFromLatLonInKm(item.geo_lat, item.geo_long);
  //     // });
  //     // console.log("Distance", distance);
  //     res.json(users);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // function getDistanceFromLatLonInKm(lat2, lon2) {
  //   //   const deg2rad = (deg) => (deg * Math.PI) / 180.0;

  //   //   let geo_lat = loggedIn.dataValues.geo_lat;
  //   //   let geo_long = loggedIn.dataValues.geo_long;
  //   //   var R = 6371; // Radius of the earth in km
  //   //   var dLat = deg2rad(lat2 - geo_lat); // deg2rad below
  //   //   var dLon = deg2rad(lon2 - geo_long);
  //   //   var a =
  //   //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //   //     Math.cos(deg2rad(geo_lat)) *
  //   //       Math.cos(deg2rad(lat2)) *
  //   //       Math.sin(dLon / 2) *
  //   //       Math.sin(dLon / 2);
  //   //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   //   var d = R * c; // Distance in km
  //   //   return d;
  //   // }
  // }
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

export const Register = async (req, res) => {
  const { username, password, confPassword, firstName, lastName, email } =
    req.body;
  const activ_code = process.env.ACTIVATION_CODE;
  const activation = {
    from: "matcha@gmail.com",
    to: email,
    subject: "Account activation",
    html: `<p>Click <a href="http://localhost:3000/activate/${activ_code}">here</a> to activate your account!</p>`,
  };
  const saltRounds = 10;
  if (username && password && confPassword && firstName && lastName && email) {
    db.query("SELECT username, email FROM users;", (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (
        (username > 10 && username < 2) ||
        (firstName > 10 && firstName < 2) ||
        (lastName > 10 && lastName < 2)
      ) {
        return res.json({
          msg: "Username, First Name and Last Name must be between 2 and 10 characters",
        });
      } else if (password !== confPassword) {
        return res.json({
          msg: "Passwords do not match",
        });
      } else if (validator.isStrongPassword(password) === false) {
        return res.json({
          msg: "Password has to be at least 8 characters \n and contain at least one uppercase, \n one lowercase, one number and \n one special character",
        });
      } else if (
        result.length > 0 &&
        result.some((user) => user.username === username)
      ) {
        return res.json({
          msg: "Username already exists",
        });
      } else if (
        result.length > 0 &&
        result.some((user) => user.email === email && validator.isEmail(email))
      ) {
        return res.json({
          msg: "Email already exists",
        });
      } else {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            res.send({ err: err });
          }
          db.query(
            "INSERT INTO users (firstName, lastName, username, email, password, activ_token) VALUES (?, ?, ?, ?, ?, ?)",
            [firstName, lastName, username, email, hash, activ_code],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              }
              transporter.sendMail(activation, function (error, info) {
                if (error) {
                  console.log({ err: error });
                }
              });
              return res.json({
                msg: "User created! Activate your account!",
              });
            }
          );
        });
      }
    });
  } else {
    return res.send({ error: "Please fill in all fields" });
  }
};

export const Login = async (req, res) => {
  const { lat, lng } = req.body;
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const userId = result[0].id;
            const name = result[0].username;
            const email = result[0].email;
            const activ_status = result[0].activ_status;
            if (activ_status === 0) {
              return res.json({
                msg: "Please activate your account",
              });
            }
            const accessToken = jwt.sign(
              { userId, name, email },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "20s",
              }
            );
            const refreshToken = jwt.sign(
              { userId, name, email },
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: "1d",
              }
            );
            res.cookie("refreshToken", refreshToken, {
              httpOnly: false,
              maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({ accessToken });
            db.query(
              "UPDATE users SET geo_lat = ?, geo_long = ?, refresh_token = ?,online = 1  WHERE id = ?",
              [lat, lng, refreshToken, userId]
            );
          } else {
            return res.json({
              msg: "Wrong username/password combination!",
            });
          }
        });
      }
    }
  );
};

export const ProfileFill = async (req, res) => {
  const { birthdate, gender, orientation, interests, bio } = req.body;
  const tags = interests.join(", ");
  if (!(birthdate && gender && orientation && interests && bio)) {
    return res.status(200).json({
      msg: "All fields are required",
    });
  } else if (birthdate < 18) {
    return res.status(200).json({
      msg: "You must be at least 18 years old",
    });
  } else if (bio.length > 500) {
    return res.status(200).json({
      msg: "Bio must be less than 500 characters",
    });
  }
  const refreshToken = req.cookies.refreshToken;
  db.query(
    "SELECT * FROM users WHERE refresh_token = ?",
    refreshToken,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        const userId = result[0].id;
        db.query(
          "UPDATE users SET birthdate = ?, gender = ?, orientation = ?, interests = ?, bio = ? WHERE id = ?",
          [birthdate, gender, orientation, tags, bio, userId],
          (err, result) => {
            if (err) {
              res.json({ err: err });
            }
            res.status(200).json({
              msg: "Profile updated",
            });
          }
        );
      }
    }
  );
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  db.query(
    "SELECT * FROM users WHERE refresh_token = ?",
    refreshToken,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        const userId = result[0].id;
        db.query(
          "UPDATE users SET refresh_token = ?, online = 0 WHERE id = ?",
          [null, userId],
          (err, result) => {
            if (err) {
              res.send({ err: err });
            }
            res.clearCookie("refreshToken");
            res.status(200).json({
              msg: "Logged out",
            });
          }
        );
      }
    }
  );
};
