// const express = require("express");
// const app = express();
// let user;
// const session = require("express-session");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const nodemailer = require("nodemailer");
// const db = require("./config/db");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());

// app.use(
//   session({
//     key: "userId",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60 * 60 * 24,
//     },
//   })
// );

// app.post("/register", (req, res) => {
//   const { username, email, password, confPassword, firstname, lastname } =
//     req.body;
//   var transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "add349a94e8fe5",
//       pass: "161004143cb79c",
//     },
//   });
//   let mailOptions = {
//     from: "matcha.acamaras@proton.me",
//     to: email,
//     subject: "Account confirmation",
//     text: "Activate your account by clicking this link: http://localhost:3000/activate",
//   };

//   if (username && password && confPassword && firstname && lastname && email) {
//     db.query("SELECT username, email FROM users;", (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       }
//       if (password !== confPassword) {
//         res.send({ message: "Passwords do not match" });
//       } else if (
//         result.length > 0 &&
//         result.some((user) => user.username === username)
//       ) {
//         res.send({ message: "Username already exists!" });
//       } else if (
//         result.length > 0 &&
//         result.some((user) => user.email === email)
//       ) {
//         res.send({ message: "Email already exists!" });
//       } else {
//         bcrypt.hash(password, saltRounds, function (err, hash) {
//           if (err) {
//             res.send({ err: err });
//           }
//           db.query(
//             "INSERT INTO users (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)",
//             [firstname, lastname, username, email, hash],
//             (err, result) => {
//               if (err) {
//                 res.send({ err: err });
//               }
//               transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                   console.log({ err: error });
//                 }
//               });
//               res.send({ message: "User created! Activate your account!" });
//             }
//           );
//         });
//       }
//     });
//   } else {
//     res.send("Please fill in all fields!");
//   }
// });

// app.get("/login", (req, res) => {
//   if (req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   db.query(
//     "SELECT * FROM users WHERE username = ?;",
//     username,
//     (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       }

//       if (result.length > 0) {
//         bcrypt.compare(password, result[0].password, (error, response) => {
//           if (response) {
//             req.session.user = result;
//             user = result[0].id;
//             console.log("this is user", user);
//             res.send(result);
//           } else {
//             res.send({ message: "Wrong username/password combination!" });
//           }
//         });
//       } else {
//         res.send({ message: "User doesn't exist" });
//       }
//     }
//   );
// });

// app.post("/completeprofile", (req, res) => {
//   const { birthdate, gender, orientation, city, interests, bio } = req.body;

//   if (birthdate || gender || orientation || city || interests || bio) {
//     db.query(
//       "UPDATE users SET birthdate = ?, gender = ?, orientation = ?, city = ?, interests = ?, bio = ? WHERE id = '" +
//         db.escape(user) +
//         "'",
//       [birthdate, gender, orientation, city, interests, bio],
//       (err, result) => {
//         if (err) {
//           console.log({ err: err });
//         }
//         console.log({ message: "Let's get some babes!" });
//       }
//     );
//   }
// });

// module.exports = app;
