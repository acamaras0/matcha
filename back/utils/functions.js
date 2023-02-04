import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;

export default function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "matcha.hive1@gmail.com",
    pass: PASSWORD_EMAIL,
  },
});

export const sendEmail = (code, email, token, id, reported) => {
  let subject = "";
  let html = "";
  let to = "";
  let text = "";
  if (code === "reset") {
    subject = "Reset your password";
    to = email;
    html = `<p>Click <a href="http://localhost:3000/resetPassword/${token}">here</a> to reset your password</p>`;
  } else if (code === "activation") {
    subject = "Account activation";
    to = email;
    html = `<h1>Welcome to MATCHA!</h1> <br/><p>Click <a href="http://localhost:3000/activate/${token}">here</a> to activate your account!</p>`;
  } else if (code === "report") {
    subject = "Report";
    to = "matcha.hive1@gmail.com";
    subject = "Report";
    text = "User " + id + " reported user " + reported;
  }
  const mailOptions = {
    from: "matcha.hive1@gmail.com",
    to: email,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const validatePassword = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    return false;
  }

  if (!validator.isStrongPassword(password)) {
    return false;
  }

  return true;
};