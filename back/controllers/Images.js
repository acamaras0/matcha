import {
  getPicPathFromDb,
  getPicsByIdFromDb,
  getUserIdFromRefreshToken,
  getUserImageCount,
  insertUserImage,
  updateProfilePic,
  getPictureCount,
  deletePicture,
  getPicture,
} from "../queries/images.js";
import fs from "fs";

export const getPicPath = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getPicPathFromDb(id);
    res.send(result);
  } catch (err) {
    res.send({ err });
  }
};

export const getPicsById = async (req, res) => {
  const { id } = req.params;
  getPicsByIdFromDb(id, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "No images found" });
    }
  });
};

export const uploadPic = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!req.file) {
    return res.status(200).json("No file uploaded");
  }
  try {
    const userId = await getUserIdFromRefreshToken(refreshToken);
    const imageCount = await getUserImageCount(userId);
    if (imageCount < 4) {
      const filename = req.file.filename;
      const img = "http://localhost:5000/upload/" + filename;
      await insertUserImage(userId, filename, img);
      res.status(200).json("Image uploaded");
    } else {
      res.status(200).json("You can only have 5 pictures.");
    }
  } catch (err) {
    res.send({ err });
  }
};

export const ProfilePic = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!req.file) {
    return res.status(200).json("No file uploaded");
  }
  const user_id = await getUserIdFromRefreshToken(refreshToken);
  const img = "http://localhost:5000/upload/" + req.file.filename;
  updateProfilePic(img, user_id, (err, result) => {
    if (err) {
      return console.log(err);
    }
    return res.status(200).json({ msg: "Picture uploaded!" });
  });
};

export const deletePic = async (req, res) => {
  const picId = req.params.id;
  const token = req.cookies.refreshToken;

  try {
    const userId = await getUserIdFromRefreshToken(token);
    const pictureCount = await getPictureCount(userId);
    if (pictureCount > 1) {
      const picture = await getPicture(picId);
      const path = `./uploads/${picture.pic_name}`;
      fs.unlink(path, (err) => {
        if (err) throw err;
        res.status(200).json({ msg: "Picture deleted." });
      });
      await deletePicture(picId);
    } else if (pictureCount == 1) {
      return res.status(200).json({ msg: "Last picture cannot be deleted." });
    }
  } catch (err) {
    return res.status(200).json({ err: err });
  }
};
