// import Users from "../models/UserModel.js";
// import Block from "../models/BlockModel.js";
// import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import db from "../config/Database.js";
// const db = require("../config/db");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "add349a94e8fe5",
    pass: "161004143cb79c",
  },
});

// export const getCoordinates = async (req, res) => {
//   const coordinates = await Users.findAll({
//     attributes: [
//       "id",
//       "username",
//       "gender",
//       "interests",
//       "bio",
//       "profile_pic",
//       "geo_lat",
//       "geo_long",
//       "birthdate",
//     ],
//     where: {
//       profile_pic: {
//         [Op.ne]: null,
//       },
//     },
//   });
//   res.json(coordinates);
// };

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
            res.status(400).json({
              msg: "Now you can login",
            });
          }
        );
      } else {
        res.status(400).json({
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
  } else if (password.length < 8 || password.length > 20) {
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

// export const updateProfile = async (req, res) => {
//   const { id } = req.params;
//   const {
//     username,
//     firstName,
//     lastName,
//     email,
//     bio,
//     interests,
//     gender,
//     orientation,
//     geoLat,
//     geoLng,
//   } = req.body;
//   const tags = interests.join(", ");
//   if (firstName) {
//     await Users.update(
//       {
//         firstname: firstName,
//       },
//       {
//         where: { id },
//       }
//     );
//   }
//   if (lastName) {
//     await Users.update(
//       {
//         lastname: lastName,
//       },
//       {
//         where: { id },
//       }
//     );
//   }
//   if (username) {
//     await Users.update(
//       {
//         username: username,
//       },
//       {
//         where: { id },
//       }
//     );
//   }
//   if (email) {
//     await Users.update(
//       {
//         email: email,
//       },
//       {
//         where: { id },
//       }
//     );
//   }
//   if (bio) {
//     await Users.update(
//       {
//         bio: bio,
//       },
//       {
//         where: { id },
//       }
//     );
//   }
//   if (interests) {
//     await Users.update(
//       {
//         interests: tags,
//       },
//       {
//         where: { id },
//       }
//     );
//   }
//   if (gender) {
//     await Users.update(
//       {
//         gender: gender,
//       },
//       {
//         where: { id },
//       }
//     );
//   }
//   if (orientation) {
//     await Users.update(
//       {
//         orientation: orientation,
//       },
//       {
//         where: { id },
//       }
//     );
//   }
//   if (geoLat) {
//     await Users.update(
//       {
//         geo_lat: geoLat,
//       },
//       {
//         where: { id },
//       }
//     );
//   }
//   if (geoLng) {
//     await Users.update(
//       {
//         geo_long: geoLng,
//       },
//       {
//         where: { id },
//       }
//     );
//   }
//   res.status(200).json({
//     msg: "Profile updated",
//   });
// };

// export const resetPass = async (req, res) => {
//   const { token } = req.params;
//   const check = await Users.findAll({
//     where: {
//       reset_token: token,
//     },
//   });
//   const { password } = req.body;
//   const { confPassword } = req.body;
//   if (password !== confPassword) {
//     return res.status(200).send("Passwords do not match");
//   } else if (password.length < 8 || password.length > 20) {
//     return res.status(200).send("Password must be at least 8 characters");
//   } else if (token === check.reset_token) {
//     return res.status(200).send("Invalid token");
//   } else {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     await Users.update(
//       {
//         password: hash,
//         reset_token: null,
//       },
//       {
//         where: {
//           reset_token: token,
//         },
//       }
//     );
//     return res.status(200).send("Password reset");
//   }
// };

export const forgotPass = async (req, res) => {
  const { email } = req.body;
  const token = process.env.ACCESS_TOKEN_SECRET;

  db.query("SELECT * FROM users WHERE email = ?", [email], 
  (err, result) => {
    if (err)
     return console.log(err);
    if (result){
      
    }
  });
  // const user = await Users.findOne({ email });
  // if (!user) {
  //   return res.status(404).json({ msg: "User not found" });
  // } else {
  //   await Users.update(
  //     {
  //       reset_token: token,
  //     },
  //     {
  //       where: {
  //         email: email,
  //       },
  //     }
  //   );
  //   const mailOptions = {
  //     from: "matcha@gmail.com",
  //     to: email,
  //     subject: "Password Reset",
  //     text:
  //       "Reset your password by clicking the following link: http://localhost:3000/resetpassword/" +
  //       token,
  //   };
  //   transporter.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       return res.status(200).json({ msg: "Email sent!" });
  //     }
  //   });
  // }
};

// export const getRandomUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await Users.findOne({
//     where: {
//       id: id,
//     },
//   });
//   console.log(user.dataValues);
//    res.json(user.dataValues);
// };

export const getUsers = async (req, res) => {
  const token = req.params.token;
  db.query(
    "SELECT * FROM users WHERE refresh_token = ?",
    [token],
    (err, result) => {
      if (err) {
        return res.json({ err: err });
      }
      const loggedIn = result[0].id;
      const orientation = result[0].orientation;
      const gender = result[0].gender;

      // db.query(
      //   "SELECT * FROM block WHERE user_id=?",
      //   [loggedIn],
      //   (err, result) => {
      //     if (err) {
      //       return res.json({ err: err });
      //     }
      //     if (result.length > 0) {
      //       const blocked = result.map((item) => item.blocked_id);
      //        console.log(blocked);
      //     }
      //   }
      // );
      if (orientation === "heterosexual" && gender === "female") {
        db.query(
          "SELECT * FROM users WHERE id != ? AND gender = 'male' AND orientation = 'heterosexual'",
          [loggedIn],
          (err, result) => {
            if (err) return res.json({ err: err });
            res.json(result);
            console.log(result);
          }
        );
      } else if (orientation === "heterosexual" && gender === "male") {
        db.query(
          "SELECT * FROM users WHERE id != ? AND gender = 'female' AND orientation = 'heterosexual'",
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
          "SELECT * FROM users WHERE id != ? AND orientation = 'bisexual'",
          [loggedIn],
          (err, result) => {
            if (err) return res.json({ err: err });
            res.json(result);
          }
        );
      }
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
    text:
      "Activate your account by clicking the following link: http://localhost:3000/activate/" +
      activ_code,
  };
  const saltRounds = 10;
  if (username && password && confPassword && firstName && lastName && email) {
    db.query("SELECT username, email FROM users;", (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (password !== confPassword) {
        res.status(400).json({
          msg: "Passwords do not match",
        });
      } else if (password >= 8) {
        res.status(400).json({
          msg: "Password has to be at least 8 characters long.",
        });
      } else if (
        result.length > 0 &&
        result.some((user) => user.username === username)
      ) {
        res.status(400).json({
          msg: "Username already exists",
        });
      } else if (
        result.length > 0 &&
        result.some((user) => user.email === email)
      ) {
        res.status(400).json({
          msg: "Email already exists",
        });
      } else {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            res.send({ err: err });
          }
          const here = db.query(
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
              res.status(400).json({
                msg: "User created! Activate your account!",
              });
            }
          );
        });
      }
    });
  } else {
    res.send({ error: "Please fill in all fields" });
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
              return res.status(400).json({
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
            return res.status(400).json({
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
    return res.status(400).json({
      msg: "All fields are required",
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
