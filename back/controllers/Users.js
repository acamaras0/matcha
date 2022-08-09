import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "username", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { username, password, confPassword, firstName, lastName, email } =
    req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "Passwords do not match" });
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    res.status(404).json({ msg: "User not found" });
  }
};

export const ProfileFill = async (req, res) => {
    const { birthdate, gender, orientation, city, interests, bio } = req.body;
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
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

