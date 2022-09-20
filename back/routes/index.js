import express from "express";
import {
  Register,
  Login,
  accountActivation,
  getUsers,
  getLoggedIn,
  ProfileFill,
  Logout,
  updatePassword,
  getRandomUser,
  forgotPass,
  resetPass,
  updateProfile,
  // getCoordinates,
  getNotifications,
  markNotifications,
} from "../controllers/Users.js";
import {
  UploadPic,
  getPicsById,
  deletePic,
  getPicPath,
} from "../controllers/Images.js";
import {
  getConversation,
  getMessages,
  newMessages,
  getMessagesNotif,
} from "../controllers/Chat.js";
import { report, block, getBlockedUsers } from "../controllers/ReportBlock.js";
import { insertLike, getFame, checkIfLiked} from "../controllers/Matches.js";
import { upload } from "../middleware/Upload.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users/info/:token", getUsers);
router.get("/user/:token", getLoggedIn);
router.get("/users/verify", verifyToken);
router.get("/token", refreshToken);
router.get("/user/pictures/:id", getPicsById, getPicPath);
router.get("/users/:id", getRandomUser);
router.get("/user/fame/:user", getFame);
//router.get("/coordinates", getCoordinates);
router.get("/user/blocked/:id", getBlockedUsers);
router.get("/user/notifications/:id", getNotifications);
router.get("/liked/:user_id/:id", checkIfLiked);

router.post("/users", Register);
router.post("/activate/:hash", accountActivation);
router.post("/login", Login);
router.post("/fill", ProfileFill);
router.post("/user/updatePassword/:id", updatePassword);
router.post("/user/update/:id", updateProfile);
router.post("/resetpassword/:token", resetPass);
router.post("/users/forgotpassword", forgotPass);
router.post("/upload", upload.single("file"), UploadPic);
router.post("/like/:user1/:user2", insertLike);
router.post("/report/:user_id/:reported_id", report);
router.post("/block/:user_id/:blocked_id", block);
router.post("/user/mark/:id", markNotifications);

router.get("/newConvo/:userId", getConversation);
router.get("/messages/:chat_id", getMessages);
router.get("/messages/:id", getMessagesNotif);
router.post("/messages", newMessages);

router.delete("/logout", Logout);
router.delete("/user/picture/:id", deletePic);

export default router;
