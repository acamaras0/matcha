import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
import bodyParser from "body-parser";
import { socketServer } from "./socket.js";
dotenv.config();
const app = express();
const { PORT } = process.env;
const server = http.createServer(app);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use("/upload", express.static("./uploads"));
app.use(router);

socketServer(server);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
