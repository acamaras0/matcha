import express from "express";
import {
  getUsers,
  Register,
  Login,
  ProfileFill,
  Logout,
  getLoggedIn,
} from "../controllers/Users.js";
import { upload } from "../middleware/Upload.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
//import Resize from "../middleware/Resize.js";
import UserImages from "../models/ImageModel.js";
import Users from "../models/UserModel.js";

const router = express.Router();

router.get("/users", getLoggedIn);
router.get("/users/info", getUsers);
router.get("/users/verify", verifyToken);
router.get("/token", refreshToken);
router.post("/users", Register);
router.post("/login", Login);
router.post("/fill", ProfileFill);

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  } else {
    console.log(req.file.filename);
    const imgsrc = "./uploads/" + req.file.filename;
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
        pic_path: imgsrc,
      });
    } catch (err) {
      console.log(err);
    }
  }
  console.log("File uploaded successfully");
});

router.delete("/logout", Logout);

export default router;
