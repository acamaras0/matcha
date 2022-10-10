import express from "express";
import {
  Register,
  Login,
  accountActivation,
  getUsers,
  getLoggedIn,
  profileFill,
  Logout,
  updatePassword,
  getRandomUser,
  forgotPass,
  resetPass,
  updateProfile,
  addView,
} from "../controllers/Users.js";
import {
  uploadPic,
  getPicsById,
  deletePic,
  getPicPath,
  ProfilePic,
} from "../controllers/Images.js";
import {
  getConversation,
  getMessages,
  newMessages,
  getMessagesNotif,
  markSeen,
} from "../controllers/Chat.js";
import {
  getNotifications,
  markNotifications,
} from "../controllers/Notifications.js";
import { location } from "../controllers/Location.js";
import { report, block, getBlockedUsers } from "../controllers/ReportBlock.js";
import { insertLike, getFame, checkIfLiked } from "../controllers/Matches.js";
import { upload } from "../middleware/Upload.js";

// THIS WILL CREATE RANDOM USERS FOR TESTING PURPOSE 

// import createFake from "../config/CreateFake.js";
// createFake()

const router = express.Router();

router.get("/users/info/:token", getUsers);
router.get("/user/:token", getLoggedIn);
router.get("/user/pictures/:id", getPicsById, getPicPath);
router.get("/users/:id", getRandomUser);
router.get("/user/fame/:user", getFame);
router.get("/user/blocked/:id", getBlockedUsers);
router.get("/user/notifications/:id", getNotifications);
router.get("/liked/:user_id/:id", checkIfLiked);
router.get("/location", location);

router.post("/users", Register);
router.post("/activate/:hash", accountActivation);
router.post("/login", Login);
router.post("/fill", profileFill);
router.post("/user/updatePassword/:id", updatePassword);
router.post("/user/update/:id", updateProfile);
router.post("/resetpassword/:token", resetPass);
router.post("/users/forgotpassword", forgotPass);
router.post("/user/views/:id", addView);

router.post("/upload", upload.single("file"), uploadPic);
router.post("/upload/profilePic", upload.single("profile"), ProfilePic);

router.post("/like/:user1/:user2", insertLike);
router.post("/report/:user_id/:reported_id", report);
router.post("/block/:user_id/:blocked_id", block);
router.post("/user/mark/:id", markNotifications);

router.get("/newConvo/:userId", getConversation);
router.get("/messages/:chat_id", getMessages);
router.get("/messages/notif/:id", getMessagesNotif);
router.post("/messages", newMessages);
router.post("/messages/seen/:id", markSeen);

router.delete("/logout", Logout);
router.delete("/user/picture/:id", deletePic);

export default router;
