import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "matcha.hive1@gmail.com",
    pass: PASSWORD_EMAIL,
  },
});

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
