import bcrypt from "bcrypt";
import validator from "validator";
import { sendEmail, validatePassword } from "../utils/functions.js";
import {
  activateUser,
  updatePasswordInDB,
  resetPasswordInDb,
  getUserByRefreshToken,
  getUserByResetToken,
  queryDb,
  getBlockedUsers,
  getRecommendedUsersQuery,
  getUserByToken,
  updateFirstName,
  updateLastName,
  checkIfUsernameExists,
  updateUsername,
  checkIfEmailExists,
  updateEmail,
  updateBio,
  updateInterests,
  updateGender,
  updateOrientation,
  updateGeoLat,
  updateGeoLong,
  updateCity,
  updateCountry,
  updateBirthdate,
} from "../queries/user.js";
import { getUserById } from "../queries/auth.js";
import db from "../config/db_init.js";

export const accountActivation = async (req, res) => {
  const hash = req.params.hash;
  activateUser(hash, (err, result) => {
    if (err) {
      res.send({ err });
    }
    res.status(200).json({
      msg: "Now you can login",
    });
  });
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password, passwordConfirm } = req.body;

  if (!validatePassword(password, passwordConfirm)) {
    return res.status(200).json({ msg: "Passwords do not match" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  updatePasswordInDB(hash, id, (err, result) => {
    if (err) {
      return res.send({ err });
    }
    res.status(200).json({
      msg: "Password updated",
    });
  });
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
    getUserByResetToken(token, (err, result) => {
      if (err) return res.json(err);
      console.log(result);
      if (result) {
        resetPasswordInDb(password, token, (err, result) => {
          if (err) {
            return res.send({ err: err });
          }
          return res.send({ msg: "Success!" });
        });
      } else {
        return res.status(200).send({ msg: "Invalid token" });
      }
    });
  }
};

export const getLoggedIn = async (req, res) => {
  const token = req.params.token;
  getUserByRefreshToken(token, (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
};

export const forgotPass = async (req, res) => {
  const { email } = req.body;
  const token = process.env.ACCESS_TOKEN_SECRET;

  const result = await queryDb("SELECT * FROM users WHERE email = ?", [email]);
  if (result.length > 0) {
    const updateResult = await queryDb(
      "UPDATE users SET reset_token = ? WHERE email = ?",
      [token, email]
    );
    if (updateResult) {
      sendEmail("reset", email, token);
      res.status(200).json({
        msg: "Email sent",
      });
    }
  } else {
    return res.status(200).json({
      msg: "Email not found",
    });
  }
};

export const getRandomUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getUserById(id);
    res.json(result);
  } catch (err) {
    res.send({ err });
  }
};

export const getRecommendedUsers = async (req, res) => {
  try {
    const token = req.params.token;
    const [userResult] = await getUserByToken(token);
    if (!userResult || !userResult.id) {
      return res.json({ err: "User not found" });
    }
    const loggedIn = userResult.id;
    const orientation = userResult.orientation;
    const gender = userResult.gender;

    const blockedResult = await getBlockedUsers(loggedIn);
    const blocked = blockedResult.map((item) => item.blocked_id).join(", ");

    const query = getRecommendedUsersQuery(
      loggedIn,
      blocked,
      orientation,
      gender
    );
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ err });
      }
      res.json(result);
    });
  } catch (err) {
    res.send({ err });
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
    updateFirstName(firstName, id);
    counter++;
  }
  if (
    lastName &&
    validator.isAlpha(lastName) &&
    lastName.length < 20 &&
    lastName.length > 2
  ) {
    updateLastName(lastName, id);
    counter++;
  }
  if (
    username &&
    validator.isAlpha(username) &&
    username.length < 10 &&
    username.length > 2
  ) {
    checkIfUsernameExists(username, (err, result) => {
      if (err) return res.json({ err });
      if (result.length > 0) {
        return console.log({ err: "Username already exists" });
      } else {
        updateUsername(username, id);
      }
    });
    counter++;
  }
  if (email && validator.isEmail(email) && email.length < 30) {
    checkIfEmailExists(email, (err, result) => {
      if (err) return res.json({ err });
      if (result.length > 0) {
        return console.log({ err: "Email already exists" });
      } else {
        updateEmail(email, id);
      }
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
    updateBio(bio, id);
    counter++;
  }
  if (interests.length > 0) {
    updateInterests(tags, id);
    counter++;
  }
  if (gender) {
    updateGender(gender, id);
    counter++;
  }
  if (orientation) {
    updateOrientation(orientation, id);
    counter++;
  }
  if (geoLat && geoLat >= -90 && geoLat <= 90) {
    updateGeoLat(geoLat, id);
    counter++;
  }
  if (geoLng && geoLng >= -180 && geoLng <= 180) {
    updateGeoLong(geoLng, id);
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
    updateCity(city, id);
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
    updateCountry(country, id);
    counter++;
  }
  if (birthdate) {
    updateBirthdate(birthdate, id);
    counter++;
  }
  if (counter > 0) {
    res.status(200).json({ msg: "Profile updated." });
  } else {
    res.status(200).json({ msg: "Something went wrong." });
  }
};
