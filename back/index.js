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

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/upload", express.static("./uploads"));
app.use(router);

socketServer(server);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//app.listen(5000, () => console.log("Server running at port 5000"));
