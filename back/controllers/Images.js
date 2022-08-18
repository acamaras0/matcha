import Users from "../models/UserModel.js";
import ImageModel from "../models/ImageModel.js";
import jwt from "jsonwebtoken";

export const getUserInfo = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "refresh_token"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUserImages = async (req, res) => {
  try {
    const images = await ImageModel.findAll({
      attributes: ["id", "user_id", "pic_name", "pic_path"],
    });
    res.json(images);
  } catch (error) {
    console.log(error);
  }
};

export const addUserImage = async (req, res) => {
  try {
    //const user_id = 
    const { pic_name, pic_path } = req.body;
    const image = await ImageModel.create({
      user_id: user_id,
      pic_name: pic_name,
      pic_path: pic_path,
    });
    res.json(image);
  } catch (error) {
    console.log(error);
  }
};
