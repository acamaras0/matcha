import Users from "../models/UserModel.js";
import UserImages from "../models/ImageModel.js";
import fs from "fs";

export const getPicsById = async (req, res) => {
  const user = await Users.findOne({
    where: {
      online: 1,
    },
  });
  const userId = user.dataValues.id;
  const pics = await UserImages.findAll({
    where: {
      user_id: userId,
    },
  });
  console.log(pics);
  res.json(pics);
};

export const UploadPic = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  const user = await Users.findOne({
    where: {
      online: 1,
    },
  });
  const userId = user.dataValues.id;
  const picCount = await UserImages.count({
    where: { user_id: userId },
  });
  if (picCount >= 5) {
    return res.status(400).send("You can only upload 5 pictures");
  } else {
    try {
      await UserImages.create({
        user_id: userId,
        pic_name: req.file.filename,
        pic_path: "http://localhost:5000/upload/" + req.file.filename,
      });
    } catch (err) {
      console.log(err);
    }
    try {
      await Users.update(
        {
          profile_pic: "http://localhost:5000/upload/" + req.file.filename,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    console.log("File uploaded successfully");
    res.sendStatus(200);
  }
};

export const deletePic = async (req, res) => {
  const pic_id = req.params.id;
  const user = await Users.findOne({
    where: {
      online: 1,
    },
  });
  const userId = user.dataValues.id;
  const picCount = await UserImages.count({
    where: { user_id: userId },
  });
  console.log(picCount);

  if (picCount > 1) {
    try {
      const picture = await UserImages.findOne({
        where: {
          id: pic_id,
        },
      });
      let path = String(`./uploads/${picture.dataValues.pic_name}`);
      fs.unlink(path, (err) => {
        if (err) throw err;
        console.log("picture deleted");
      });
    } catch (err) {
      console.log(err);
    }
    try {
      await UserImages.destroy({
        where: { id: pic_id },
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(200).json({ msg: "Last picture cannot be deleted" });
  }
};
