import geoip from "geoip-lite";
import { publicIpv4 } from "public-ip";
import makeid from "../utils/functions.js";
import db from "../config/db_init.js";
import {
  checkAndInsertUser,
  checkUserExistenceAndLogin,
  updateUserStatus,
  getUserByRefreshToken,
  updateProfile,
} from "../queries/auth.js";

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
    checkAndInsertUser(
      username,
      password,
      confPassword,
      firstName,
      lastName,
      email,
      activ_code,
      saltRounds,
      res
    );
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

    checkUserExistenceAndLogin(
      username,
      password,
      lat,
      lng,
      city,
      country,
      res
    );
  });
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  getUserByRefreshToken(refreshToken, (err, result) => {
    if (err) {
      res.send({ err });
    }
    if (result.length > 0) {
      updateUserStatus(refreshToken, 0, (err, result) => {
        if (err) {
          res.send({ err });
        }
        res.clearCookie("refreshToken");
        res.status(200).json({
          msg: "Logged out",
        });
      });
    }
  });
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
        return res.send({ err });
      }
      if (result.length > 0) {
        const userId = result[0].id;
        updateProfile(
          birthdate,
          gender,
          orientation,
          tags,
          bio,
          userId,
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
