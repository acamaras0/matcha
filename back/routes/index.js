import express from "express";
import {
  getUsers,
  Register,
  Login,
  ProfileFill,
  Logout,
  getLoggedIn,
  getRandomUser,
  forgotPass,
  resetPass,
  updateProfile,
  accountActivation
} from "../controllers/Users.js";
import { UploadPic, getPicsById, deletePic } from "../controllers/Images.js";
import { upload} from "../middleware/Upload.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", getLoggedIn);
router.get("/users/info", getUsers);
router.get("/users/verify", verifyToken);
router.get("/token", refreshToken);
router.get("/user/pictures", getPicsById);
router.get("/users/:id", getRandomUser);

router.post("/activate/:hash", accountActivation);

router.post("/user/update/:id", updateProfile);
router.post("/resetpassword/:token", resetPass);
router.post("/users/forgotpassword", forgotPass);
router.post("/users", Register);
router.post("/login", Login);
router.post("/fill", ProfileFill);
router.post("/upload", upload.single("file"), UploadPic);

router.delete("/logout", Logout);
router.delete("/user/picture/:id", deletePic)

export default router;
