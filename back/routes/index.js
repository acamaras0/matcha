import express from "express";
import {
  getUsers,
  Register,
  Login,
  ProfileFill,
  Logout,
  getLoggedIn,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", getLoggedIn);
router.get("/users/info", getUsers);
router.get("/users/verify", verifyToken);
router.post("/users", Register);
router.post("/login", Login);
router.post("/fill", ProfileFill);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
export default router;
