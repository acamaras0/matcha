import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import geoip from "geoip-lite";
import { publicIpv4 } from "public-ip";
import makeid from "../utils/functions.js";
import validator from "validator";
import { sendEmail } from "../utils/functions.js";
import db from "../config/db_init.js";

export const Register = async (req, res) => {
  const { username, password, confPassword, firstName, lastName, email } =
    req.body;
  const activ_code = makeid(20);
  const saltRounds = 10;
  if (
    username.length !== 0 &&
    password.length !== 0 &&
    confPassword.length !== 0 &&
    firstName.length !== 0 &&
    lastName.length !== 0 &&
    email.length !== 0
  ) {
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
          db.query(
            "INSERT INTO users (firstName, lastName, username, email, password, activ_token) VALUES (?, ?, ?, ?, ?, ?)",
            [firstName, lastName, username, email, hash, activ_code],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              }
              sendEmail("activation", email, activ_code);
              return res.json({
                msg: "User created! Activate your account!",
              });
            }
          );
        });
      }
    });
  } else {
    return res.send({ msg: "Please fill in all fields" });
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  publicIpv4().then((ip) => {
    const geo = geoip.lookup(ip);
    const lat = geo.ll[0];
    const lng = geo.ll[1];
    const city = geo.city;
    const country = geo.country;

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
  });
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

export const profileFill = async (req, res) => {
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
  } else if (
    bio.length > 500 &&
    !bio.match(
      /\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/gi
    )
  ) {
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
        return res.send({ err: err });
      }
      if (result.length > 0) {
        const userId = result[0].id;
        db.query(
          "UPDATE users SET birthdate = ?, gender = ?, orientation = ?, interests = ?, bio = ? WHERE id = ?",
          [birthdate, gender, orientation, tags, bio, userId],
          (err, result) => {
            if (err) {
              return console.log(err);
            }
            return res.status(200).send("Profile updated");
          }
        );
      }
    }
  );
};
