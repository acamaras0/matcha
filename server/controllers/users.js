var express = require("express");
var userRouter = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const db = require("../config/db");
let userId;

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "add349a94e8fe5",
    pass: "161004143cb79c",
  },
});

userRouter.post("/register", (req, res) => {
  const { username, password, confPassword, firstName, lastName, email } =
    req.body;

  let activation = {
    from: "matcha.acamaras@proton.me",
    to: email,
    subject: "Account confirmation",
    text: "Activate your account by clicking this link: http://localhost:3000/activate",
  };

  if (username && password && confPassword && firstName && lastName && email) {
    db.query("SELECT username, email FROM users;", (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (password !== confPassword) {
        res.send({ error: "Passwords do not match" });
      } else if (password >= 8) {
        res.send({ error: "Password has to be at least 8 characters long." });
      } else if (
        result.length > 0 &&
        result.some((user) => user.username === username)
      ) {
        res.send({ error: "Username already exists!" });
      } else if (
        result.length > 0 &&
        result.some((user) => user.email === email)
      ) {
        res.send({ error: "Email already exists!" });
      } else {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            res.send({ err: err });
          }
          db.query(
            "INSERT INTO users (firstName, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)",
            [firstName, lastName, username, email, hash],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              }
              transporter.sendMail(activation, function (error, info) {
                if (error) {
                  console.log({ err: error });
                }
              });
              res.send({ message: "User created! Activate your account!" });
            }
          );
        });
      }
    });
  } else {
    res.send({ error: "Please fill in all fields" });
  }
});

userRouter.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

userRouter.post("/login", (req, res) => {
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
            req.session.user = result;
            userId = result[0].id;
            console.log("this is user", userId);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ error: "User doesn't exist" });
      }
    }
  );
});

userRouter.post("/completeprofile", (req, res) => {
  const { birthdate, gender, orientation, city, interests, bio } = req.body;

  if (
    (birthdate.length > 0 ||
      gender.length > 0 ||
      orientation.length > 0 ||
      city.length > 0 ||
      interests.length > 0 ||
      bio.length > 0) &&
    userId !== null
  ) {
    db.query(
      "UPDATE users SET birthdate = ?, gender = ?, orientation = ?, city = ?, interests = ?, bio = ? WHERE id = '" +
        db.escape(userId) +
        "'",
      [birthdate, gender, orientation, city, interests, bio],
      (err, result) => {
        if (err) {
          console.log({ error: err });
        }
        console.log({ message: "Let's get some babes!" });
      }
    );
  } else {
    res.send({ error: "Fill in the forms!" });
  }
});

userRouter.post("/forgotpassword", (req, res) => {
  const email = req.body.email;

  let recovery = {
    from: "matcha.acamaras@proton.me",
    to: email,
    subject: "Password recovery",
    text: "Recover your password by clicking this link: http://localhost:3000/recovery",
  };

  db.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
    if (err) {
      res.send({ error: err });
    }

    if (result.length > 0) {
      transporter.sendMail(recovery, function (error, info) {
        if (error) {
          console.log({ error: error });
        }
        res.send({ message: "Check your email!" });
      });
    } else {
      res.send({ error: "Email address doesn't exist" });
    }
  });
});

userRouter.get("/logout", (req, res) => {
  if (req.session) {
    console.log("here"),
      req.session.destroy((err) => {
        if (err) {
          res.status(400).send({ error: "Unable to log out" });
        } else {
          res.send({ message: "Logout successful" });
        }
      });
  } else {
    res.end();
  }
});

module.exports = userRouter;
