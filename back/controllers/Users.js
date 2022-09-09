import Users from "../models/UserModel.js";
import Block from "../models/BlockModel.js";
import { Op } from "sequelize";
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

// export const getCoordinates = async (req, res) => {
//   const coordinates = await Users.findAll({
//     attributes: [
//       "id",
//       "username",
//       "gender",
//       "interests",
//       "bio",
//       "profile_pic",
//       "geo_lat",
//       "geo_long",
//       "birthdate",
//     ],
//     where: {
//       profile_pic: {
//         [Op.ne]: null,
//       },
//     },
//   });
//   res.json(coordinates);
// };

export const accountActivation = async (req, res) => {
  const hash = req.params.hash;
  const user = await Users.findOne({
    where: {
      activ_token: hash,
    },
  });
  if (!user) {
    return res.status(202).send("User not found");
  } else {
    const check = user.dataValues.activ_token;

    if (!check) {
      return res.status(200).send("Invalid link");
    } else if (check === hash) {
      await Users.update(
        {
          activ_token: "",
          activ_status: 1,
        },
        {
          where: {
            id: user.dataValues.id,
          },
        }
      );
      res.status(200).send("Account activated");
    } else {
      res.status(200).send("Invalid token");
    }
  }
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    return res.status(200).send("Passwords do not match");
  } else if (password.length < 8 || password.length > 20) {
    return res.status(200).send("Password must be at least 8 characters");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await Users.update(
      {
        password: hash,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send("Password updated");
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
  } = req.body;
  const tags = interests.join(", ");
  if (firstName) {
    await Users.update(
      {
        firstname: firstName,
      },
      {
        where: { id },
      }
    );
  }
  if (lastName) {
    await Users.update(
      {
        lastname: lastName,
      },
      {
        where: { id },
      }
    );
  }
  if (username) {
    await Users.update(
      {
        username: username,
      },
      {
        where: { id },
      }
    );
  }
  if (email) {
    await Users.update(
      {
        email: email,
      },
      {
        where: { id },
      }
    );
  }
  if (bio) {
    await Users.update(
      {
        bio: bio,
      },
      {
        where: { id },
      }
    );
  }
  if (interests) {
    await Users.update(
      {
        interests: tags,
      },
      {
        where: { id },
      }
    );
  }
  if (gender) {
    await Users.update(
      {
        gender: gender,
      },
      {
        where: { id },
      }
    );
  }
  if (orientation) {
    await Users.update(
      {
        orientation: orientation,
      },
      {
        where: { id },
      }
    );
  }
  if (geoLat) {
    await Users.update(
      {
        geo_lat: geoLat,
      },
      {
        where: { id },
      }
    );
  }
  if (geoLng) {
    await Users.update(
      {
        geo_long: geoLng,
      },
      {
        where: { id },
      }
    );
  }
  res.status(200).json({
    msg: "Profile updated",
  });
};

export const resetPass = async (req, res) => {
  const { token } = req.params;
  const check = await Users.findAll({
    where: {
      reset_token: token,
    },
  });
  const { password } = req.body;
  const { confPassword } = req.body;
  if (password !== confPassword) {
    return res.status(200).send("Passwords do not match");
  } else if (password.length < 8 || password.length > 20) {
    return res.status(200).send("Password must be at least 8 characters");
  } else if (token === check.reset_token) {
    return res.status(200).send("Invalid token");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await Users.update(
      {
        password: hash,
        reset_token: null,
      },
      {
        where: {
          reset_token: token,
        },
      }
    );
    return res.status(200).send("Password reset");
  }
};

export const forgotPass = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  const token = process.env.ACCESS_TOKEN_SECRET;
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  } else {
    await Users.update(
      {
        reset_token: token,
      },
      {
        where: {
          email: email,
        },
      }
    );
    const mailOptions = {
      from: "matcha@gmail.com",
      to: email,
      subject: "Password Reset",
      text:
        "Reset your password by clicking the following link: http://localhost:3000/resetpassword/" +
        token,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json({ msg: "Email sent!" });
      }
    });
  }
};

export const getRandomUser = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findAll({
    where: {
      id: id,
    },
  });
  res.json(user[0].dataValues);
};

export const getUsers = async (req, res) => {
  const token = req.params.token;
  const loggedIn = await Users.findOne({
    where: {
      refresh_token: token,
    },
  });
  let id = loggedIn.dataValues.id;
  let orientation = loggedIn.dataValues.orientation;
  let gender = loggedIn.dataValues.gender;
  // function getDistanceFromLatLonInKm(lat2, lon2) {
  //   const deg2rad = (deg) => (deg * Math.PI) / 180.0;

  //   let geo_lat = loggedIn.dataValues.geo_lat;
  //   let geo_long = loggedIn.dataValues.geo_long;
  //   var R = 6371; // Radius of the earth in km
  //   var dLat = deg2rad(lat2 - geo_lat); // deg2rad below
  //   var dLon = deg2rad(lon2 - geo_long);
  //   var a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(deg2rad(geo_lat)) *
  //       Math.cos(deg2rad(lat2)) *
  //       Math.sin(dLon / 2) *
  //       Math.sin(dLon / 2);
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c; // Distance in km
  //   return d;
  // }

  const blocked = await Block.findAll({
    where: {
      user_id: id,
    },
  });

  const block = blocked.map((item) => {
    return item.dataValues.blocked_id;
  });

  if (orientation === "heterosexual" && gender === "female") {
    try {
      const users = await Users.findAll({
        where: {
          id: { [Op.notIn]: [...block, id] },
          gender: { [Op.eq]: "male" },
          orientation: { [Op.eq]: "heterosexual" },
        },
      });
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  } else if (orientation === "heterosexual" && gender === "male") {
    try {
      const users = await Users.findAll({
        where: {
          id: { [Op.notIn]: [...block, id] },
          orientation: { [Op.eq]: "heterosexual" },
          gender: { [Op.eq]: "female" },
        },
      });
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  } else if (orientation === "homosexual" && gender === "female") {
    try {
      const users = await Users.findAll({
        where: {
          id: { [Op.notIn]: [...block, id] },
          gender: { [Op.eq]: "female" },
          orientation: { [Op.eq]: "homosexual" },
        },
      });
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  } else if (orientation === "homosexual" && gender === "male") {
    try {
      const users = await Users.findAll({
        where: {
          id: { [Op.notIn]: [...block, id] },
          gender: { [Op.eq]: "male" },
          orientation: { [Op.eq]: "homosexual" },
        },
      });
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  } else if (
    orientation === "bisexual" &&
    (gender === "male" || gender === "female")
  ) {
    try {
      const users = await Users.findAll({
        where: {
          id: { [Op.notIn]: [...block, id] },
          orientation: { [Op.eq]: "bisexual" },
        },
      });
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  } else if (gender === "other") {
    try {
      const users = await Users.findAll({
        where: {
          id: { [Op.notIn]: [...block, id] },
        },
      });
      // const distance = users.map((item) => {
      //   return getDistanceFromLatLonInKm(item.geo_lat, item.geo_long);
      // });
      // console.log("Distance", distance);
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }
};

export const getLoggedIn = async (req, res) => {
  const token = req.params.token;
  try {
    const loggedIn = await Users.findOne({
      where: {
        refresh_token: token,
      },
    });
    res.json(loggedIn);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { username, password, confPassword, firstName, lastName, email } =
    req.body;
  const activ_code = process.env.ACTIVATION_CODE;
  const mailOptions = {
    from: "matcha@gmail.com",
    to: email,
    subject: "Account activation",
    text:
      "Activate your account by clicking the following link: http://localhost:3000/activate/" +
      activ_code,
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
        activ_token: activ_code,
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
  const { lat, lng } = req.body;
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
    const activ_status = user[0].activ_status;
    if (activ_status === 0)
      return res.status(400).json({ msg: "Account not activated" });
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
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
    await Users.update(
      {
        online: 1,
        geo_lat: lat,
        geo_long: lng,
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
  const { birthdate, gender, orientation, interests, bio } = req.body;
  const tags = interests.join(", ");
  if (!(birthdate && gender && orientation && interests && bio)) {
    return res.status(400).json({
      msg: "All fields are required",
    });
  }
  const refreshToken = req.cookies.refreshToken;
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  const userId = user[0].id;
  res.status(200);
  try {
    await Users.update(
      {
        birthdate: birthdate,
        gender: gender,
        orientation: orientation,
        interests: tags,
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
