import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "add349a94e8fe5",
    pass: "161004143cb79c",
  },
});

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: [
        "id",
        "username",
        "email",
        "birthdate",
        "gender",
        "orientation",
        "city",
        "online",
      ],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { username, password, confPassword, firstName, lastName, email } =
    req.body;
  const mailOptions = {
    from: "matcha@gmail.com",
    to: email,
    subject: "Account activation",
    text:
      "Activate your account by clicking the following link: http://localhost:3000/activate/" +
      username,
  };
  const user = await Users.findOne({
    where: {
      username,
    },
  });
  const userMail = await Users.findOne({
    where: {
      email,
    },
  });
  if (
    !(username && password && confPassword && firstName && lastName && email)
  ) {
    return res.status(400).json({
      msg: "All fields are required",
    });
  } else if (user) {
    res.status(400).json({
      msg: "Username already exists",
    });
  } else if (username < 3 || username > 20) {
    res.status(400).json({
      msg: "Username must be between 3 and 20 characters",
    });
  } else if (userMail) {
    res.status(400).json({
      msg: "Email already exists",
    });
  } else if (password < 8 || password > 20) {
    return res.status(400).json({
      msg: "Passwords must be between 8 and 20 characters long",
    });
  } else if (password !== confPassword)
    return res.status(400).json({ msg: "Passwords do not match" });
  else {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await Users.create({
        username: username,
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: hashPassword,
      });
      res.json({ msg: "Success! User created" });
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        username: req.body.username,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const name = user[0].username;
    const email = user[0].email;
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
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
    await Users.update(
      {
        online: 1,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  } catch (error) {
    res.status(404).json({ msg: "User not found" });
  }
};

export const ProfileFill = async (req, res) => {
  const { birthdate, gender, orientation, city, interests, bio } = req.body;
  if (!(birthdate && gender && orientation && city && interests && bio)) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const refreshToken = req.cookies.refreshToken;
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  const userId = user[0].id;
  try {
    await Users.update(
      {
        birthdate: birthdate,
        gender: gender,
        orientation: orientation,
        city: city,
        interests: interests,
        bio: bio,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.json({ msg: "Success! Profile filled!" });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  await Users.update(
    {
      online: 0,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
