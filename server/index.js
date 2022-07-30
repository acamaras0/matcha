const express = require("express");
//const mysql = require("mysql");
const cors = require("cors");
const db = require("./config/db");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.email;

  if (username && password && firstname && lastname && email) {
    db.query("SELECT username, email FROM users;", (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      else if (
        result.length > 0 &&
        result.some((user) => user.username === username)
      ) {
        res.send({ message: "Username already exists" });
      }
      else if (result.length > 0 && result.some((user) => user.email === email)) {
        res.send({ message: "Email already exists" });
      } else {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            res.send({ err: err });
          }
          db.query(
            "INSERT INTO users (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)",
            [firstname, lastname, username, email, hash],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              }
              res.send({ message: "User created!" });
            }
          );
        });
      }
    });
  } else {
    res.send("Please fill in all fields!");
  }
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

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
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running server");
});
