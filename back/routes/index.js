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
  accountActivation,
  getCoordinates,
  updatePassword,
} from "../controllers/Users.js";
import {
  UploadPic,
  getPicsById,
  deletePic,
  getPicPath,
} from "../controllers/Images.js";
import { insertLike, unLike } from "../controllers/Matches.js";
import { upload } from "../middleware/Upload.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users/info", getUsers);
router.get("/user/:token", getLoggedIn);
router.get("/users/verify", verifyToken);
router.get("/token", refreshToken);
router.get("/user/pictures/:id", getPicsById, getPicPath);
router.get("/users/:id", getRandomUser);
router.get("/coordinates", getCoordinates);

router.post("/activate/:hash", accountActivation);
router.post("/user/updatePassword/:id", updatePassword);
router.post("/user/update/:id", updateProfile);
router.post("/resetpassword/:token", resetPass);
router.post("/users/forgotpassword", forgotPass);
router.post("/users", Register);
router.post("/login", Login);
router.post("/fill", ProfileFill);
router.post("/upload", upload.single("file"), UploadPic);

router.post("/like/:user1/:user2", insertLike);
router.post("/unlike/:user1/:user2", unLike);

router.delete("/logout", Logout);
router.delete("/user/picture/:id", deletePic);

export default router;
