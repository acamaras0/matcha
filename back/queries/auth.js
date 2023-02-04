import db from "../config/db_init.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { sendEmail } from "../utils/functions.js";

export const checkAndInsertUser = (
  username,
  password,
  confPassword,
  firstName,
  lastName,
  email,
  activ_code,
  saltRounds,
  res
) => {
  db.query("SELECT username, email FROM users;", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (
      !validator.isAlpha(firstName) ||
      !validator.isAlpha(lastName) ||
      !validator.isAlpha(username) ||
      (username > 10 && username < 2) ||
      (firstName > 10 && firstName < 2) ||
      (lastName > 10 && lastName < 2)
    ) {
      return res.json({
        msg: "Username, First Name and Last Name must be between 2 and 10 alphabetical characters.",
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
      (result.some((user) => user.username === username) ||
        result.some(
          (user) => user.username.toLowerCase() === username.toLowerCase()
        ))
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
        insertUser(firstName, lastName, username, email, hash, activ_code, res);
      });
    }
  });
};

const insertUser = (
  firstName,
  lastName,
  username,
  email,
  hash,
  activ_code,
  res
) => {
  db.query(
    "INSERT INTO users (firstName, lastName, username, email, password, activ_token) VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, username, email, hash, activ_code],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      sendEmail("activation", email, activ_code);
      res.json({
        msg: "User has been registered. Activation email has been sent.",
      });
    }
  );
};

export const checkUserExistenceAndLogin = (
  username,
  password,
  lat,
  lng,
  city,
  country,
  res
) => {
  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
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
            const cookie = res.cookie("refreshToken", refreshToken, {
              httpOnly: false,
              maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({ accessToken });
            db.query(
              "UPDATE users SET geo_lat = ?, geo_long = ?, city = ?, country = ?, refresh_token = ?,online = 1  WHERE id = ?",
              [lat, lng, city, country, refreshToken, userId]
            );
          } else {
            return res.json({
              msg: "Wrong username/password combination!",
            });
          }
        });
      } else
        return res.json({
          msg: "User does not exist.",
        });
    }
  );
};

export const updateUserStatus = (refreshToken, onlineStatus, callback) => {
  db.query(
    "UPDATE users SET refresh_token = ?, online = ? WHERE refresh_token = ?",
    [null, onlineStatus, refreshToken],
    (err, result) => {
      if (err) {
        callback({ err });
      }
      callback(null, result);
    }
  );
};

export const getUserByRefreshToken = (refreshToken, callback) => {
  db.query(
    "SELECT * FROM users WHERE refresh_token = ?",
    refreshToken,
    (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    }
  );
};

export const getUserById = async (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result[0]);
    });
  });
};

export const updateProfile = (
  birthdate,
  gender,
  orientation,
  tags,
  bio,
  userId,
  callback
) => {
  db.query(
    "UPDATE users SET birthdate = ?, gender = ?, orientation = ?, interests = ?, bio = ? WHERE id = ?",
    [birthdate, gender, orientation, tags, bio, userId],
    (err, result) => {
      callback(err, result);
    }
  );
};
