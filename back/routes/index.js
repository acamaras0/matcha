import express from "express";
import path from "path";
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
import Resize from "../middleware/Resize.js";


const router = express.Router();

router.get("/users", getLoggedIn);
router.get("/users/info", getUsers);
router.get("/users/verify", verifyToken);
router.get("/token", refreshToken);
router.post("/users", Register);
router.post("/login", Login);
router.post("/fill", ProfileFill);

router.post('/upload', upload.single('image'), async function (req, res) {
  const imagePath = path.join(__dirname, '../uploads');
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ name: filename });
});


router.delete("/logout", Logout);


export default router;
