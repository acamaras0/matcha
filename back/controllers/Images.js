import Users from "../models/UserModel.js";
import UserImages from "../models/ImageModel.js";

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
}

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
  try {
    await UserImages.create({
      user_id: userId,
      pic_name: req.file.filename,
      pic_path: "./uploads/" + req.file.filename,
    });
  } catch (err) {
    console.log(err);
  }
  console.log("File uploaded successfully");
  res.sendStatus(200);
};
